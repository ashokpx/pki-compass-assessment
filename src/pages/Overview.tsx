
import React from 'react';
import { useAssessment } from '@/contexts/AssessmentContext';
import RadarChart from '@/components/RadarChart';
import ScoreCard from '@/components/ScoreCard';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';

const Overview: React.FC = () => {
  const { domainScores, overallScore, resetAssessment } = useAssessment();
  
  const anyScoresRecorded = overallScore > 0;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-pki-blue">PKI Maturity Assessment</h1>
      
      <div className="mb-8">
        <Alert className="bg-pki-lightBlue text-pki-blue border-pki-blue">
          <Info className="h-5 w-5" />
          <AlertTitle className="font-medium">Welcome to the PKI Compass Assessment Tool</AlertTitle>
          <AlertDescription>
            This tool helps you evaluate your organization's PKI maturity across four key domains: 
            Governance, Management, Operations, and Resources. Navigate through each tab to answer 
            questions and receive a comprehensive maturity score.
          </AlertDescription>
        </Alert>
      </div>

      {!anyScoresRecorded && (
        <Alert className="mb-8 bg-yellow-50 border-yellow-200">
          <AlertTriangle className="h-5 w-5 text-yellow-600" />
          <AlertTitle className="font-medium text-yellow-800">No assessment data yet</AlertTitle>
          <AlertDescription className="text-yellow-700">
            You haven't completed any sections of the assessment yet. Begin by navigating to one of the domain 
            tabs (Governance, Management, Operations, Resources) and answering the questions.
          </AlertDescription>
        </Alert>
      )}

      {anyScoresRecorded && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <ScoreCard title="Overall Maturity" score={overallScore} color="border-t-indigo-600" />
            <ScoreCard title="Governance" score={domainScores.governance} color="border-t-blue-600" />
            <ScoreCard title="Management" score={domainScores.management} color="border-t-green-600" />
            <ScoreCard title="Operations" score={domainScores.operations} color="border-t-yellow-600" />
            <ScoreCard title="Resources" score={domainScores.resources} color="border-t-red-600" />
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Maturity Radar Chart</h2>
            <RadarChart showDetailedView={true} />
          </div>
        </>
      )}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">Assessment Domains</h2>
          <p className="text-gray-600">
            Click on each domain to answer assessment questions:
          </p>
        </div>
        
        {anyScoresRecorded && (
          <Button 
            variant="destructive" 
            onClick={() => {
              if (window.confirm('Are you sure you want to reset the assessment? All your answers will be lost.')) {
                resetAssessment();
              }
            }}
          >
            Reset Assessment
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link to="/governance" className="no-underline">
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">Governance</h3>
            <p className="text-gray-600 mb-4">
              Assess your PKI policies, governance structure, risk management, and compliance framework.
            </p>
            <div className="flex justify-end">
              <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                Start Assessment
              </Button>
            </div>
          </div>
        </Link>

        <Link to="/management" className="no-underline">
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-green-600 mb-2">Management</h3>
            <p className="text-gray-600 mb-4">
              Evaluate your certificate inventory, lifecycle management, renewal processes, and key management.
            </p>
            <div className="flex justify-end">
              <Button variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
                Start Assessment
              </Button>
            </div>
          </div>
        </Link>

        <Link to="/operations" className="no-underline">
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-yellow-600 mb-2">Operations</h3>
            <p className="text-gray-600 mb-4">
              Assess your incident response, CA operations, business continuity, and PKI monitoring.
            </p>
            <div className="flex justify-end">
              <Button variant="outline" className="text-yellow-600 border-yellow-600 hover:bg-yellow-50">
                Start Assessment
              </Button>
            </div>
          </div>
        </Link>

        <Link to="/resources" className="no-underline">
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-red-600 mb-2">Resources</h3>
            <p className="text-gray-600 mb-4">
              Evaluate your PKI expertise, training programs, management tools, and executive support.
            </p>
            <div className="flex justify-end">
              <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                Start Assessment
              </Button>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Overview;
