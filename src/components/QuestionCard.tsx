
import React, { useState, useEffect } from 'react';
import { useAssessment, Question } from '@/contexts/AssessmentContext';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

interface QuestionCardProps {
  question: Question;
  showFeedback?: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, showFeedback = true }) => {
  const { answers, setAnswer } = useAssessment();
  const { toast } = useToast();
  const existingAnswer = answers.find(a => a.questionId === question.id);
  const selectedValue = existingAnswer ? existingAnswer.score : 0;
  
  // Local state to track score changes for animation
  const [prevValue, setPrevValue] = useState(selectedValue);
  const [isScoreChanged, setIsScoreChanged] = useState(false);
  
  useEffect(() => {
    if (selectedValue !== prevValue) {
      setPrevValue(selectedValue);
      setIsScoreChanged(true);
      
      // Reset animation state after animation completes
      const timer = setTimeout(() => {
        setIsScoreChanged(false);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [selectedValue, prevValue]);

  const handleChange = (value: string) => {
    const newValue = parseInt(value, 10);
    const prevValue = selectedValue;
    setAnswer(question.id, newValue);
    
    // Show toast notification for first answer or score change
    if (showFeedback) {
      if (prevValue === 0) {
        toast({
          title: "Question answered",
          description: "Your assessment score has been updated",
          duration: 2000,
        });
      } else if (prevValue !== newValue) {
        toast({
          title: "Answer updated",
          description: `Changed from ${prevValue} to ${newValue}`,
          duration: 2000,
        });
      }
    }
  };

  // Determine score color based on score value
  const getScoreColor = (score: number) => {
    if (score === 0) return "text-gray-400";
    if (score >= 4) return "text-green-500";
    if (score >= 3) return "text-blue-500";
    if (score >= 2) return "text-orange-500";
    return "text-red-500";
  };

  return (
    <Card className="mb-6 border-t-4 border-t-pki-blue relative">
      {/* Score indicator */}
      {selectedValue > 0 && (
        <motion.div 
          className={`absolute top-0 right-0 h-12 w-12 rounded-bl-lg flex items-center justify-center ${getScoreColor(selectedValue)}`}
          initial={isScoreChanged ? { scale: 1.5, backgroundColor: "#b875dc" } : {}}
          animate={isScoreChanged ? { scale: 1, backgroundColor: "transparent" } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xl font-bold">{selectedValue}</span>
        </motion.div>
      )}
      
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold mb-4 pr-10">{question.text}</h3>
        
        <RadioGroup 
          value={selectedValue.toString()} 
          onValueChange={handleChange}
          className="space-y-3"
        >
          {question.options.map((option, index) => (
            <div key={index} className="flex items-start space-x-2 p-2 rounded hover:bg-pki-lightBlue">
              <RadioGroupItem 
                value={option.value.toString()} 
                id={`${question.id}-option-${option.value}`} 
                className="mt-1"
              />
              <div className="flex-1">
                <Label 
                  htmlFor={`${question.id}-option-${option.value}`}
                  className="flex items-center cursor-pointer"
                >
                  <span className="font-medium mr-2">{option.value}:</span>
                  <span>{option.label}</span>
                </Label>
              </div>
            </div>
          ))}
        </RadioGroup>
        
        {selectedValue === 0 && (
          <p className="text-orange-500 mt-4 text-sm">Please select an option</p>
        )}
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
