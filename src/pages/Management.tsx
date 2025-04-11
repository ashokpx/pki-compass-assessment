
import React from 'react';
import { useAssessment, managementQuestions } from '@/contexts/AssessmentContext';
import QuestionCard from '@/components/QuestionCard';
import ScoreCard from '@/components/ScoreCard';
import RadarChart from '@/components/RadarChart';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Management: React.FC = () => {
  const { domainScores } = useAssessment();
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-600">Management Assessment</h1>
        <ScoreCard title="Management Score" score={domainScores.management} color="border-t-green-600" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
            <p className="text-green-700">
              This section evaluates your certificate inventory practices, lifecycle management, renewal processes, 
              revocation procedures, and private key management. Answer all questions to receive your management maturity score.
            </p>
          </div>

          <div className="mb-6">
            {managementQuestions.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Live Assessment Progress</h3>
              <RadarChart size="md" showLegend={false} />
              <div className="text-center mt-4 text-sm text-gray-500">
                Chart updates as you answer questions
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link to="/governance" className="flex items-center gap-2">
            <ChevronLeft size={16} />
            Back to Governance
          </Link>
        </Button>
        
        <Button asChild className="bg-green-600 hover:bg-green-700">
          <Link to="/operations" className="flex items-center gap-2">
            Continue to Operations
            <ChevronRight size={16} />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Management;
