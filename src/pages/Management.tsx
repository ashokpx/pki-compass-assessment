import React from 'react';
import { useAssessment, managementQuestions } from '@/contexts/AssessmentContext';
import QuestionCard from '@/components/QuestionCard';
import ScoreCard from '@/components/ScoreCard';
import RadarChart from '@/components/RadarChart';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ClipboardList, BarChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Make sure management questions are scorable
const scorableManagementQuestions = managementQuestions.map(question => ({
  ...question,
  isReadOnly: false // explicitly mark as scorable
}));

const Management: React.FC = () => {
  const { domainScores } = useAssessment();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-green-600">Management Assessment</h1>
          <p className="text-gray-600 mt-1">
            Evaluate certificate inventory, lifecycle management, and key management practices
          </p>
        </div>
        <ScoreCard title="Management Score" score={domainScores.management} color="border-t-green-600" />
      </header>
      
      <Card className="bg-green-50 border-green-200 mb-6 overflow-hidden shadow-sm">
        <div className="h-1 bg-green-500 w-full"></div>
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <div className="flex-shrink-0 text-green-600 mt-1">
              <ClipboardList size={24} />
            </div>
            <div>
              <h2 className="text-lg font-medium text-green-700 mb-1">Active Assessment Section</h2>
              <p className="text-green-700">
                This section evaluates your certificate inventory, lifecycle management, renewal processes, and key management.
                Your answers to these questions will contribute to your management maturity score.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="questions" className="w-full">
            <TabsList className="w-full grid grid-cols-2 mb-6">
              <TabsTrigger value="questions" className="text-sm">
                <ClipboardList size={16} className="mr-2" />
                Assessment Questions
              </TabsTrigger>
              <TabsTrigger value="progress" className="text-sm">
                <BarChart size={16} className="mr-2" />
                Progress & Analytics
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="questions" className="space-y-6">
              {scorableManagementQuestions.map((question) => (
                <QuestionCard key={question.id} question={question} />
              ))}
            </TabsContent>
            
            <TabsContent value="progress">
              <Card>
                <CardHeader>
                  <CardTitle>Management Domain Analytics</CardTitle>
                  <CardDescription>Detailed breakdown of your management scores</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <RadarChart size="md" showLegend={true} showDetailedView={true} />
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    <h3 className="text-lg font-medium">Response Summary</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {scorableManagementQuestions.map((question, idx) => {
                        const score = useAssessment().getQuestionScore(question.id);
                        const scoreColor = score === 0 
                          ? "text-gray-500" 
                          : score >= 4 
                            ? "text-green-600" 
                            : score >= 3 
                              ? "text-blue-600" 
                              : score >= 2 
                                ? "text-orange-600" 
                                : "text-red-600";
                                
                        return (
                          <div key={question.id} className="flex items-center gap-2">
                            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-xs font-medium">
                              {idx + 1}
                            </div>
                            <div className="flex-grow">
                              <div className="text-sm font-medium text-gray-700 truncate max-w-xs">
                                {question.text}
                              </div>
                              <div className={`text-sm font-medium ${scoreColor}`}>
                                {score > 0 ? `Score: ${score}/5` : 'Not answered'}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Assessment Progress</CardTitle>
              <CardDescription>Track your management domain assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <RadarChart size="sm" showLegend={false} showDetailedView={false} />
              </div>
              
              <div className="space-y-4 mb-6">
                <h3 className="text-sm font-medium text-gray-700">Completion Status</h3>
                <div className="space-y-2">
                  {scorableManagementQuestions.map((question) => {
                    const score = useAssessment().getQuestionScore(question.id);
                    const completed = score > 0;
                    
                    return (
                      <div key={question.id} className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-2 ${completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        <span className="text-xs truncate max-w-[200px]">{question.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="text-center text-xs text-gray-500">
                Chart updates as you answer questions
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" asChild className="border-blue-300 text-blue-600 hover:bg-blue-50">
          <Link to="/governance" className="flex items-center gap-2">
            <ChevronLeft size={16} />
            Back to Governance
          </Link>
        </Button>
        
        <Button asChild className="bg-yellow-600 hover:bg-yellow-700 text-white">
          <Link to="/operations" className="flex items-center gap-2">
            Continue to Operations
            <ChevronRight size={16} />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
};

export default Management;
