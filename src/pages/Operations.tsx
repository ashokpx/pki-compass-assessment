
import React from 'react';
import { useAssessment, operationsQuestions } from '@/contexts/AssessmentContext';
import QuestionCard from '@/components/QuestionCard';
import ScoreCard from '@/components/ScoreCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Operations: React.FC = () => {
  const { domainScores } = useAssessment();
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-yellow-600">Operations Assessment</h1>
        <ScoreCard title="Operations Score" score={domainScores.operations} color="border-t-yellow-600" />
      </div>
      
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-8">
        <p className="text-yellow-700">
          This section evaluates your PKI operational practices including incident response, CA operations,
          business continuity planning, certificate deployment, and monitoring. Answer all questions to receive 
          your operations maturity score.
        </p>
      </div>

      <div className="mb-8">
        {operationsQuestions.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link to="/management" className="flex items-center gap-2">
            <ChevronLeft size={16} />
            Back to Management
          </Link>
        </Button>
        
        <Button asChild className="bg-yellow-600 hover:bg-yellow-700">
          <Link to="/resources" className="flex items-center gap-2">
            Continue to Resources
            <ChevronRight size={16} />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Operations;
