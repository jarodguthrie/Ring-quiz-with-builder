import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { RingBuilderAPI, calculatePrice } from '../../services/ringBuilderApi';
import { Sparkles, Heart, Star, ArrowRight, ArrowLeft, BookOpen, ShoppingBag, AlertCircle } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import PersonalityQuiz from './PersonalityQuiz';
import StoneSelector from './StoneSelector';
import SettingSelector from './SettingSelector';
import MetalSelector from './MetalSelector';
import PriceDisplay from './PriceDisplay';

const RingBuilder = () => {
  const [currentStep, setCurrentStep] = useState('quiz');
  const [quizResults, setQuizResults] = useState(null);
  const [selectedStone, setSelectedStone] = useState(null);
  const [selectedSetting, setSelectedSetting] = useState(null);
  const [selectedMetal, setSelectedMetal] = useState(null);
  const [selectedCarat, setSelectedCarat] = useState(1.0);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(0);
  
  // Data states
  const [stones, setStones] = useState([]);
  const [settings, setSettings] = useState([]);
  const [metals, setMetals] = useState([]);
  const [recommendations, setRecommendations] = useState(null);
  
  // Loading states
  const [loading, setLoading] = useState(true);
  const [priceLoading, setPriceLoading] = useState(false);
  const [error, setError] = useState(null);

  const { toast } = useToast();

  const steps = ['quiz', 'stone', 'setting', 'metal', 'summary'];
  const stepTitles = {
    quiz: 'Personality Quiz',
    stone: 'Choose Your Stone',
    setting: 'Select Setting',
    metal: 'Pick Metal',
    summary: 'Your Perfect Ring'
  };

  const progress = (steps.indexOf(currentStep) + 1) / steps.length * 100;

  // Load data on component mount
  useEffect(() => {
    loadInitialData();
  }, []);

  // Calculate price when selections change
  useEffect(() => {
    if (selectedStone && selectedSetting && selectedMetal && selectedCarat) {
      calculateCurrentPrice();
    }
  }, [selectedStone, selectedSetting, selectedMetal, selectedCarat]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [stonesData, settingsData, metalsData] = await Promise.all([
        RingBuilderAPI.getStones(),
        RingBuilderAPI.getSettings(),
        RingBuilderAPI.getMetals()
      ]);
      
      setStones(stonesData);
      setSettings(settingsData);
      setMetals(metalsData);
      setError(null);
    } catch (err) {
      setError('Failed to load ring builder data. Please refresh the page.');
      toast({
        title: "Error Loading Data",
        description: "Please refresh the page and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateCurrentPrice = async () => {
    try {
      setPriceLoading(true);
      const price = await calculatePrice(selectedStone, selectedSetting, selectedMetal, selectedCarat);
      setCurrentPrice(price);
    } catch (err) {
      console.error('Price calculation error:', err);
      // Fallback to 0 if API fails
      setCurrentPrice(0);
    } finally {
      setPriceLoading(false);
    }
  };

  const handleQuizComplete = async (personalityResult, quizAnswers) => {
    setQuizResults(personalityResult);
    
    try {
      // Get recommendations from API
      const analysisResponse = await RingBuilderAPI.analyzeQuiz(quizAnswers);
      setRecommendations(analysisResponse.recommendation);
      setShowRecommendations(true);
    } catch (err) {
      console.error('Failed to get recommendations:', err);
      toast({
        title: "Recommendations Unavailable",
        description: "We'll help you choose the perfect ring manually.",
        variant: "default",
      });
    }
    
    setCurrentStep('stone');
  };

  const applyRecommendations = () => {
    if (!recommendations) return;
    
    // Find matching products based on recommendations
    const recommendedStone = stones.find(s => s.cut === recommendations.stone);
    const recommendedSetting = settings.find(s => s.name.toLowerCase().includes(recommendations.setting.toLowerCase()));
    const recommendedMetal = metals.find(m => m.name.toLowerCase().includes(recommendations.metal.toLowerCase()));
    
    if (recommendedStone) setSelectedStone(recommendedStone);
    if (recommendedSetting) setSelectedSetting(recommendedSetting);
    if (recommendedMetal) setSelectedMetal(recommendedMetal);
    
    setShowRecommendations(false);
    setCurrentStep('summary');
    
    toast({
      title: "Recommendations Applied! ✨",
      description: "We've selected the perfect combination for you.",
    });
  };

  const nextStep = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 'stone': return selectedStone;
      case 'setting': return selectedSetting;
      case 'metal': return selectedMetal;
      default: return true;
    }
  };

  const handleBookConsultation = async () => {
    if (selectedStone && selectedSetting && selectedMetal) {
      try {
        // Save configuration before redirecting
        await RingBuilderAPI.saveConfiguration(
          selectedStone.id,
          selectedSetting.id,
          selectedMetal.id,
          selectedCarat,
          quizResults
        );
        
        toast({
          title: "Configuration Saved! 🎉",
          description: "Your ring details have been saved. Opening booking page...",
        });
      } catch (err) {
        console.error('Failed to save configuration:', err);
      }
    }
    
    window.open('https://moissaniteengagementrings.com.au/pages/showroom-appointment', '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <Sparkles className="h-12 w-12 text-rose-500 mx-auto mb-4 animate-spin" />
          <h2 className="text-xl font-semibold mb-2">Loading Ring Builder</h2>
          <p className="text-gray-600">Preparing your perfect ring experience...</p>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2 text-red-600">Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={loadInitialData} className="bg-rose-500 hover:bg-rose-600">
            Try Again
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-rose-500" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent">
              Custom Ring Builder
            </h1>
            <Heart className="h-8 w-8 text-rose-500" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create the perfect moissanite engagement ring with our personalized builder. 
            Get recommendations based on personality and customize every detail.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Step {steps.indexOf(currentStep) + 1} of {steps.length}: {stepTitles[currentStep]}
            </span>
            <span className="text-sm font-medium text-gray-600">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Recommendations Banner */}
        {showRecommendations && recommendations && (
          <Card className="mb-6 p-6 bg-gradient-to-r from-rose-100 to-amber-100 border-rose-200">
            <div className="flex items-start gap-4">
              <Star className="h-8 w-8 text-amber-500 mt-1" />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Perfect Match Found! ✨
                </h3>
                <p className="text-gray-700 mb-4">
                  Based on your personality quiz: {recommendations.description}
                </p>
                <Button 
                  onClick={applyRecommendations}
                  className="bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600"
                >
                  Apply Recommendations
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Builder Steps */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              {currentStep === 'quiz' && (
                <PersonalityQuiz onComplete={handleQuizComplete} />
              )}
              
              {currentStep === 'stone' && (
                <StoneSelector
                  stones={stones}
                  selected={selectedStone}
                  onSelect={setSelectedStone}
                  selectedCarat={selectedCarat}
                  onCaratChange={setSelectedCarat}
                />
              )}
              
              {currentStep === 'setting' && (
                <SettingSelector
                  settings={settings}
                  selected={selectedSetting}
                  onSelect={setSelectedSetting}
                />
              )}
              
              {currentStep === 'metal' && (
                <MetalSelector
                  metals={metals}
                  selected={selectedMetal}
                  onSelect={setSelectedMetal}
                />
              )}
              
              {currentStep === 'summary' && (
                <div className="text-center">
                  <div className="mb-6">
                    <Sparkles className="h-16 w-16 text-rose-500 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Perfect Ring!</h2>
                    <p className="text-gray-600">Here's your custom moissanite engagement ring</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-4">
                      <div className="p-4 bg-rose-50 rounded-lg">
                        <h4 className="font-semibold text-gray-800">Stone</h4>
                        <p>{selectedStone?.name} - {selectedCarat} carat</p>
                      </div>
                      <div className="p-4 bg-amber-50 rounded-lg">
                        <h4 className="font-semibold text-gray-800">Setting</h4>
                        <p>{selectedSetting?.name}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-gray-800">Metal</h4>
                        <p>{selectedMetal?.name}</p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-semibold text-gray-800">Total Price</h4>
                        <p className="text-2xl font-bold text-green-600">
                          ${priceLoading ? '...' : currentPrice.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Button 
                      size="lg"
                      className="w-full bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600"
                      onClick={handleBookConsultation}
                    >
                      <BookOpen className="mr-2 h-5 w-5" />
                      Book Consultation
                    </Button>
                    <Button 
                      variant="outline"
                      size="lg"
                      className="w-full"
                      onClick={() => window.open('https://moissaniteengagementrings.com.au/collections/all', '_blank')}
                    >
                      <ShoppingBag className="mr-2 h-5 w-5" />
                      View Similar Rings
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Price & Navigation Sidebar */}
          <div className="space-y-6">
            <PriceDisplay 
              price={currentPrice}
              stone={selectedStone}
              setting={selectedSetting}
              metal={selectedMetal}
              carat={selectedCarat}
              loading={priceLoading}
            />
            
            {/* Navigation */}
            <Card className="p-4">
              <div className="space-y-3">
                {currentStep !== 'quiz' && (
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    className="w-full"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                )}
                
                {currentStep !== 'summary' && currentStep !== 'quiz' && (
                  <Button
                    onClick={nextStep}
                    disabled={!canProceed()}
                    className="w-full bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600"
                  >
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </Card>

            {/* Quick Jump Navigation */}
            <Card className="p-4">
              <h4 className="font-semibold mb-3">Quick Navigation</h4>
              <div className="space-y-2">
                {steps.map((step, index) => (
                  <button
                    key={step}
                    onClick={() => setCurrentStep(step)}
                    disabled={step === 'quiz' || (index === 0)}
                    className={`w-full text-left p-2 rounded text-sm transition-colors ${
                      currentStep === step
                        ? 'bg-rose-100 text-rose-700 font-medium'
                        : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    {index + 1}. {stepTitles[step]}
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RingBuilder;