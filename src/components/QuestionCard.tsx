
import React from 'react';
import { useAssessment, Question } from '@/contexts/AssessmentContext';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface QuestionCardProps {
  question: Question;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  const { answers, setAnswer } = useAssessment();
  const existingAnswer = answers.find(a => a.questionId === question.id);
  const selectedValue = existingAnswer ? existingAnswer.score : 0;

  const handleChange = (value: string) => {
    setAnswer(question.id, parseInt(value, 10));
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
