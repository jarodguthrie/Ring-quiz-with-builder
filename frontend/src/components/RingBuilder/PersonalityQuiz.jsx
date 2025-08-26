import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { RingBuilderAPI } from '../../services/ringBuilderApi';
import { Heart, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';

const PersonalityQuiz = ({ onComplete }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [analysisLoading, setAnalysisLoading] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const questionsData = await RingBuilderAPI.getQuizQuestions();
      setQuestions(questionsData);
      setLoading(false);
    } catch (err) {
      toast({
        title: "Error Loading Quiz",
        description: "Unable to load quiz questions. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const handleAnswer = async (personality) => {
    const newAnswers = { 
      ...answers, 
      [currentQuestion]: { 
        questionId: questions[currentQuestion].id.toString(), 
        personality 
      } 
    };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      // All questions answered - analyze results
      setShowResults(true);
      setAnalysisLoading(true);
      
      try {
        // Convert answers to array format expected by API
        const answersArray = Object.values(newAnswers);
        const analysis = await RingBuilderAPI.analyzeQuiz(answersArray);
        
        setTimeout(() => {
          setAnalysisLoading(false);
          onComplete(analysis.personality, answersArray);
        }, 2000); // Show loading animation for 2 seconds
        
      } catch (err) {
        setAnalysisLoading(false);
        toast({
          title: "Analysis Failed",
          description: "We'll help you choose the perfect ring manually.",
          variant: "default",
        });
        
        // Fallback - calculate dominant personality locally
        const personalityCount = {};
        Object.values(newAnswers).forEach(answer => {
          personalityCount[answer.personality] = (personalityCount[answer.personality] || 0) + 1;
        });
        
        const dominantPersonality = Object.entries(personalityCount)
          .sort(([,a], [,b]) => b - a)[0][0];
        
        onComplete(dominantPersonality, Object.values(newAnswers));
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setAnalysisLoading(false);
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <Loader2 className="h-12 w-12 text-rose-500 mx-auto mb-4 animate-spin" />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading Quiz</h2>
        <p className="text-gray-600">Preparing your personality assessment...</p>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="text-center py-8">
        <div className="mb-6">
          <div className={analysisLoading ? "animate-bounce mb-4" : "mb-4"}>
            <Sparkles className="h-16 w-16 text-rose-500 mx-auto" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {analysisLoading ? 'Analyzing Your Style...' : 'Quiz Complete!'}
          </h2>
          <p className="text-lg text-gray-600">
            {analysisLoading ? 
              'Finding the perfect ring for your personality...' : 
              'Moving to stone selection...'
            }
          </p>
        </div>
        
        {analysisLoading && (
          <div className="max-w-md mx-auto">
            <Card className="p-6 bg-gradient-to-r from-rose-50 to-amber-50">
              <Loader2 className="h-8 w-8 text-rose-500 mx-auto mb-4 animate-spin" />
              <p className="text-gray-600 text-sm">
                Processing your responses and matching with our curated collection...
              </p>
            </Card>
          </div>
        )}
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-8">
        <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-600 mb-2">Quiz Unavailable</h2>
        <p className="text-gray-500 mb-4">Unable to load quiz questions</p>
        <Button onClick={loadQuestions} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div>
      <div className="text-center mb-8">
        <Heart className="h-12 w-12 text-rose-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Let's Find Your Perfect Style
        </h2>
        <p className="text-gray-600">
          Answer a few questions to get personalized recommendations
        </p>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-rose-500 to-amber-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            {question.question}
          </h3>
          
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => handleAnswer(option.personality)}
                className="w-full text-left p-4 h-auto hover:bg-rose-50 hover:border-rose-300 transition-all duration-200 hover:scale-105 group"
              >
                <div className="flex items-center justify-between">
                  <span>{option.text}</span>
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Button>
            ))}
          </div>
        </Card>
        
        {currentQuestion > 0 && (
          <div className="text-center mt-6">
            <Button 
              variant="ghost" 
              onClick={resetQuiz}
              className="text-gray-500 hover:text-gray-700"
            >
              Start Over
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalityQuiz;