
import React from 'react';
import { useAssessment, Question } from '@/contexts/AssessmentContext';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface QuestionCardProps {
  question: Question;
  showFeedback?: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, showFeedback = true }) => {
  const { answers, setAnswer } = useAssessment();
  const { toast } = useToast();
  const existingAnswer = answers.find(a => a.questionId === question.id);
  const selectedValue = existingAnswer ? existingAnswer.score : 0;

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

  return (
    <Card className="mb-6 border-t-4 border-t-pki-blue">
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold mb-4">{question.text}</h3>
        
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
