
import React from 'react';
import { useAssessment, resourcesQuestions } from '@/contexts/AssessmentContext';
import QuestionCard from '@/components/QuestionCard';
import ScoreCard from '@/components/ScoreCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Resources: React.FC = () => {
  const { domainScores } = useAssessment();
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-red-600">Resources Assessment</h1>
        <ScoreCard title="Resources Score" score={domainScores.resources} color="border-t-red-600" />
      </div>
      
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
        <p className="text-red-700">
          This section evaluates your PKI resources including dedicated expertise, training programs,
          management tools, budget allocation, and executive support. Answer all questions to receive 
          your resources maturity score.
        </p>
      </div>

      <div className="mb-8">
        {resourcesQuestions.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link to="/operations" className="flex items-center gap-2">
            <ChevronLeft size={16} />
            Back to Operations
          </Link>
        </Button>
        
        <Button asChild className="bg-red-600 hover:bg-red-700">
          <Link to="/report" className="flex items-center gap-2">
            View Full Report
            <ChevronRight size={16} />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Resources;
