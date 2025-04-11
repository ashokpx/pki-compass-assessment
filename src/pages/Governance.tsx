
import React from 'react';
import { useAssessment, governanceQuestions } from '@/contexts/AssessmentContext';
import QuestionCard from '@/components/QuestionCard';
import ScoreCard from '@/components/ScoreCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Governance: React.FC = () => {
  const { domainScores } = useAssessment();
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Governance Assessment</h1>
        <ScoreCard title="Governance Score" score={domainScores.governance} color="border-t-blue-600" />
      </div>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
        <p className="text-blue-700">
          This section evaluates your PKI governance policies, structure, risk management framework, and compliance.
          Answer all questions to receive your governance maturity score.
        </p>
      </div>

      <div className="mb-8">
        {governanceQuestions.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link to="/" className="flex items-center gap-2">
            <ChevronLeft size={16} />
            Back to Overview
          </Link>
        </Button>
        
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link to="/management" className="flex items-center gap-2">
            Continue to Management
            <ChevronRight size={16} />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Governance;
