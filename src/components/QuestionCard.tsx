import React, { useState, useEffect } from 'react';
import { useAssessment, Question } from '@/contexts/AssessmentContext';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  showFeedback?: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, showFeedback = true }) => {
  const { answers, setAnswer } = useAssessment();
  const { toast } = useToast();
  const existingAnswer = answers.find(a => a.questionId === question.id);
  // Default to 1 if no answer exists
  const selectedValue = existingAnswer ? existingAnswer.score : 1;
  
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
    
    // Show toast notification for score change
    if (showFeedback && prevValue !== newValue) {
      toast({
        title: "Answer updated",
        description: `Changed from ${prevValue} to ${newValue}`,
        duration: 2000,
      });
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
    <Card className="mb-4 border-l-4 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
      style={{ 
        borderLeftColor: selectedValue >= 4 ? 'var(--green-500)' 
          : selectedValue >= 3 ? 'var(--blue-500)' 
          : selectedValue >= 2 ? 'var(--orange-500)' 
          : 'var(--red-500)' 
      }}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <motion.div 
            initial={isScoreChanged ? { scale: 1.5 } : {}}
            animate={isScoreChanged ? { scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className={`flex-shrink-0 mt-1 ${getScoreColor(selectedValue)}`}
          >
            <CheckCircle2 size={20} />
          </motion.div>
          
          <div className="flex-grow">
            <h3 className="text-lg font-medium mb-3 text-gray-700">{question.text}</h3>
            
            <RadioGroup 
              value={selectedValue.toString()} 
              onValueChange={handleChange}
              className="space-y-2"
            >
              {question.options.map((option) => (
                <div key={option.value} className="flex items-center">
                  <div className={`
                    flex items-center gap-2 py-2 px-3 rounded-md border w-full transition-all 
                    ${selectedValue.toString() === option.value.toString() 
                      ? 'bg-blue-50 border-blue-300' 
                      : 'bg-white border-gray-200 hover:border-blue-200 hover:bg-blue-50/30'
                    }
                  `}>
                    <RadioGroupItem 
                      value={option.value.toString()} 
                      id={`${question.id}-option-${option.value}`} 
                    />
                    <Label 
                      htmlFor={`${question.id}-option-${option.value}`}
                      className="flex items-center cursor-pointer gap-2 flex-grow"
                    >
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-800 text-xs font-medium">
                        {option.value}
                      </span>
                      <span>{option.label}</span>
                    </Label>
                  </div>
                </div>
              ))}
            </RadioGroup>
            
            <div className="mt-3 flex justify-end">
              <div className={`text-sm font-medium ${getScoreColor(selectedValue)}`}>
                Score: {selectedValue}/5
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
