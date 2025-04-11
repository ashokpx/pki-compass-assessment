import React from 'react';
import { useAssessment } from '@/contexts/AssessmentContext';
import RadarChart from '@/components/RadarChart';
import ScoreCard from '@/components/ScoreCard';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import { AlertCircle, AlertTriangle, Info, ChevronRight, RotateCcw, BarChart4 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';

const Overview: React.FC = () => {
  const { domainScores, overallScore, resetAssessment } = useAssessment();
  
  const anyScoresRecorded = overallScore > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-pki-blue">PKI Maturity Assessment</h1>
          <p className="text-gray-600 mt-1">Evaluate your organization's PKI maturity across key domains</p>
        </div>
        
        {anyScoresRecorded && (
          <Button 
            variant="destructive" 
            onClick={() => {
              if (window.confirm('Are you sure you want to reset the assessment? All your answers will be lost.')) {
                resetAssessment();
              }
            }}
            className="flex items-center gap-2"
          >
            <RotateCcw size={16} />
            Reset Assessment
          </Button>
        )}
      </div>
      
      <Card className="mb-8 border-pki-blue shadow-sm overflow-hidden">
        <div className="h-1 bg-pki-blue w-full"></div>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Info className="h-5 w-5 text-pki-blue" />
            <CardTitle className="text-pki-blue">Welcome to the PKI Compass Assessment Tool</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            This tool helps you evaluate your organization's PKI maturity across four key domains.
            <strong className="text-pki-blue"> Only the Management section is scorable, </strong> 
            while Governance, Operations, and Resources sections are provided for reference purposes. 
            Your overall score will be based solely on the Management section.
          </p>
        </CardContent>
      </Card>

      {!anyScoresRecorded && (
        <Alert className="mb-8 bg-amber-50 border-amber-200 shadow-sm">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
          <AlertTitle className="font-medium text-amber-800">No assessment data yet</AlertTitle>
          <AlertDescription className="text-amber-700">
            You haven't completed any sections of the assessment yet. Begin with the Management section 
            below to start scoring your PKI maturity.
          </AlertDescription>
        </Alert>
      )}

      {anyScoresRecorded && (
        <>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-700">
              <BarChart4 size={20} className="text-pki-blue" />
              Assessment Summary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <ScoreCard title="Overall Maturity" score={overallScore} color="border-t-indigo-600" />
              <ScoreCard title="Governance" score={domainScores.governance} color="border-t-blue-600" />
              <ScoreCard title="Management" score={domainScores.management} color="border-t-green-600" />
              <ScoreCard title="Operations" score={domainScores.operations} color="border-t-yellow-600" />
              <ScoreCard title="Resources" score={domainScores.resources} color="border-t-red-600" />
            </div>
          </div>

          <Card className="bg-white rounded-lg shadow-sm mb-8 overflow-hidden">
            <div className="h-1 bg-pki-blue w-full"></div>
            <CardHeader>
              <CardTitle>Maturity Radar Chart</CardTitle>
              <CardDescription>Visualized maturity scores across all domains</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <RadarChart showDetailedView={true} />
              </div>
            </CardContent>
          </Card>
        </>
      )}

      <div className="mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-700">
          <span className="inline-block w-5 h-5 rounded-full bg-pki-blue flex items-center justify-center text-white text-xs">
            1
          </span>
          Assessment Domains
        </h2>
        <p className="text-gray-600 mt-1 ml-7">
          Click on each domain card below to view or answer assessment questions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <motion.div 
          whileHover={{ y: -5 }} 
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link to="/governance" className="no-underline block h-full">
            <Card className="bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all h-full">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-blue-600">Governance</CardTitle>
                  <div className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Reference Only</div>
                </div>
              </CardHeader>
              <CardContent className="pb-6">
                <p className="text-gray-600 mb-4">
                  View PKI policies, governance structure, risk management, and compliance framework questions.
                </p>
              </CardContent>
              <CardFooter className="pt-0 justify-end">
                <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50">
                  <span>View Section</span>
                  <ChevronRight size={16} className="ml-1" />
                </Button>
              </CardFooter>
            </Card>
          </Link>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }} 
          transition={{ type: "spring", stiffness: 300 }}
          className="relative"
        >
          <div className="absolute -top-3 -right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full z-10 shadow-sm">
            Scorable
          </div>
          <Link to="/management" className="no-underline block h-full">
            <Card className="bg-white border-2 border-green-500 hover:shadow-md transition-all h-full">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-green-600">Management</CardTitle>
                  <div className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active Assessment</div>
                </div>
              </CardHeader>
              <CardContent className="pb-6">
                <p className="text-gray-600 mb-4">
                  Evaluate your certificate inventory, lifecycle management, renewal processes, and key management.
                </p>
              </CardContent>
              <CardFooter className="pt-0 justify-end">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <span>Score This Section</span>
                  <ChevronRight size={16} className="ml-1" />
                </Button>
              </CardFooter>
            </Card>
          </Link>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }} 
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link to="/operations" className="no-underline block h-full">
            <Card className="bg-white border border-gray-200 hover:border-yellow-300 hover:shadow-md transition-all h-full">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-yellow-600">Operations</CardTitle>
                  <div className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Reference Only</div>
                </div>
              </CardHeader>
              <CardContent className="pb-6">
                <p className="text-gray-600 mb-4">
                  View incident response, CA operations, business continuity, and PKI monitoring questions.
                </p>
              </CardContent>
              <CardFooter className="pt-0 justify-end">
                <Button variant="outline" className="border-yellow-300 text-yellow-600 hover:bg-yellow-50">
                  <span>View Section</span>
                  <ChevronRight size={16} className="ml-1" />
                </Button>
              </CardFooter>
            </Card>
          </Link>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }} 
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link to="/resources" className="no-underline block h-full">
            <Card className="bg-white border border-gray-200 hover:border-red-300 hover:shadow-md transition-all h-full">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-red-600">Resources</CardTitle>
                  <div className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Reference Only</div>
                </div>
              </CardHeader>
              <CardContent className="pb-6">
                <p className="text-gray-600 mb-4">
                  View PKI expertise, training programs, management tools, and executive support questions.
                </p>
              </CardContent>
              <CardFooter className="pt-0 justify-end">
                <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                  <span>View Section</span>
                  <ChevronRight size={16} className="ml-1" />
                </Button>
              </CardFooter>
            </Card>
          </Link>
        </motion.div>
      </div>
      
      {anyScoresRecorded && (
        <div className="flex justify-center mb-8">
          <Link to="/report" className="no-underline">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm px-6">
              View Detailed Report
            </Button>
          </Link>
        </div>
      )}
    </motion.div>
  );
};

export default Overview;
