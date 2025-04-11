import React from 'react';
import { Question } from '@/contexts/AssessmentContext';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

interface ReadOnlyQuestionCardProps {
  question: Question;
}

const ReadOnlyQuestionCard: React.FC<ReadOnlyQuestionCardProps> = ({ question }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6"
    >
      <Card className="overflow-hidden shadow-sm transition-all duration-300 border-gray-200 bg-gray-50 hover:shadow-md">
        <CardContent className="pt-6 pb-6">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1 text-gray-400">
              <HelpCircle size={20} />
            </div>
            
            <div className="flex-grow">
              <h3 className="text-lg font-semibold mb-4">{question.text}</h3>
              
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <div 
                    key={index} 
                    className="flex items-start p-3 rounded-md bg-white border border-gray-100"
                  >
                    <div className="flex-grow">
                      <div className="flex items-center">
                        <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 mr-2">
                          {option.value}
                        </span>
                        <span>{option.label}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                  <HelpCircle size={16} />
                  <span>This question is read-only and cannot be scored</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ReadOnlyQuestionCard; 