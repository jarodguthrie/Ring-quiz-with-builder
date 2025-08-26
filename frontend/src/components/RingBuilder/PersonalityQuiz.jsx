import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ringData } from '../../data/mock';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';

const PersonalityQuiz = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const questions = ringData.personalityQuiz;

  const handleAnswer = (personality) => {
    const newAnswers = { ...answers, [currentQuestion]: personality };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      // Calculate dominant personality
      const personalityCount = {};
      Object.values(newAnswers).forEach(p => {
        personalityCount[p] = (personalityCount[p] || 0) + 1;
      });
      
      const dominantPersonality = Object.entries(personalityCount)
        .sort(([,a], [,b]) => b - a)[0][0];
      
      setShowResults(true);
      setTimeout(() => onComplete(dominantPersonality), 2000);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  if (showResults) {
    const personalityCount = {};
    Object.values(answers).forEach(p => {
      personalityCount[p] = (personalityCount[p] || 0) + 1;
    });
    
    const dominantPersonality = Object.entries(personalityCount)
      .sort(([,a], [,b]) => b - a)[0][0];
    
    const recommendation = ringData.recommendations[dominantPersonality];

    return (
      <div className="text-center py-8">
        <div className="mb-6">
          <div className="animate-bounce mb-4">
            <Sparkles className="h-16 w-16 text-rose-500 mx-auto" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h2>
          <p className="text-lg text-gray-600">Analyzing your personality...</p>
        </div>
        
        <div className="max-w-md mx-auto">
          <Card className="p-6 bg-gradient-to-r from-rose-50 to-amber-50">
            <Heart className="h-8 w-8 text-rose-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2 capitalize">
              {dominantPersonality} Style
            </h3>
            <p className="text-gray-600 mb-4">{recommendation.description}</p>
            <Badge variant="secondary" className="bg-rose-100 text-rose-700">
              Perfect Match Found!
            </Badge>
          </Card>
        </div>
        
        <p className="text-sm text-gray-500 mt-4">Proceeding to stone selection...</p>
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
                className="w-full text-left p-4 h-auto hover:bg-rose-50 hover:border-rose-300 transition-all duration-200 hover:scale-105"
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