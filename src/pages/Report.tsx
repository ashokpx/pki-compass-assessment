
import React, { useRef } from 'react';
import { useAssessment } from '@/contexts/AssessmentContext';
import RadarChart from '@/components/RadarChart';
import ScoreCard from '@/components/ScoreCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronLeft, Download, RefreshCw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

const Report: React.FC = () => {
  const { domainScores, overallScore, resetAssessment } = useAssessment();
  const reportRef = useRef<HTMLDivElement>(null);
  
  const getMaturityLevel = (score: number) => {
    if (score >= 4.5) return { level: 'Optimized', color: 'text-green-600' };
    if (score >= 3.5) return { level: 'Managed', color: 'text-green-500' };
    if (score >= 2.5) return { level: 'Defined', color: 'text-blue-500' };
    if (score >= 1.5) return { level: 'Basic', color: 'text-orange-500' };
    return { level: 'Initial', color: 'text-red-500' };
  };

  const getDomainRecommendation = (domain: string, score: number) => {
    if (score >= 4.5) return `Your ${domain} practices are at an optimized level. Focus on maintaining excellence and innovating.`;
    if (score >= 3.5) return `Your ${domain} practices are well-managed. Look for opportunities to further optimize and integrate.`;
    if (score >= 2.5) return `Your ${domain} practices are defined but could be improved. Focus on consistency and measurement.`;
    if (score >= 1.5) return `Your ${domain} practices are at a basic level. Prioritize formalization and documentation.`;
    return `Your ${domain} practices need significant improvement. Start by establishing fundamental processes.`;
  };
  
  const anyScoresRecorded = overallScore > 0;

  if (!anyScoresRecorded) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6 text-pki-blue">PKI Maturity Report</h1>
        
        <Alert className="mb-8 bg-yellow-50 border-yellow-200">
          <AlertTriangle className="h-5 w-5 text-yellow-600" />
          <AlertDescription className="text-yellow-700">
            You haven't completed any sections of the assessment yet. Please navigate to the assessment 
            tabs (Governance, Management, Operations, Resources) and answer the questions to generate a report.
          </AlertDescription>
        </Alert>
        
        <Button variant="outline" asChild>
          <Link to="/" className="flex items-center gap-2">
            <ChevronLeft size={16} />
            Back to Overview
          </Link>
        </Button>
      </div>
    );
  }

  const maturityLevel = getMaturityLevel(overallScore);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-pki-blue">PKI Maturity Report</h1>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} />
            Export Report
          </Button>
          <Button 
            variant="destructive" 
            className="flex items-center gap-2"
            onClick={() => {
              if (window.confirm('Are you sure you want to reset the assessment? All your answers will be lost.')) {
                resetAssessment();
              }
            }}
          >
            <RefreshCw size={16} />
            Reset Assessment
          </Button>
        </div>
      </div>
      
      <div ref={reportRef} className="space-y-8">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
              <ScoreCard title="Overall Maturity" score={overallScore} color="border-t-indigo-600" />
              <ScoreCard title="Governance" score={domainScores.governance} color="border-t-blue-600" />
              <ScoreCard title="Management" score={domainScores.management} color="border-t-green-600" />
              <ScoreCard title="Operations" score={domainScores.operations} color="border-t-yellow-600" />
              <ScoreCard title="Resources" score={domainScores.resources} color="border-t-red-600" />
            </div>
            
            <div className="bg-indigo-50 p-4 rounded-md mb-6">
              <h3 className="text-lg font-semibold text-indigo-800 mb-2">Overall Maturity Assessment</h3>
              <p className="text-indigo-700">
                Your PKI maturity is at the <span className={`font-bold ${maturityLevel.color}`}>{maturityLevel.level}</span> level 
                with an overall score of {overallScore.toFixed(1)} out of 5.0. 
                {overallScore < 3.5 ? 
                  " There are several areas where improvements could enhance your PKI security and efficiency." : 
                  " Your PKI practices are well established, with opportunities for further optimization."}
              </p>
            </div>
            
            <h3 className="text-lg font-semibold mb-4">Maturity Radar Chart</h3>
            <div className="h-96 mb-6">
              <RadarChart />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">Domain Analysis</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-blue-600 mb-2">Governance: {domainScores.governance.toFixed(1)}/5.0</h3>
                <p className="text-gray-700 mb-2">
                  {getDomainRecommendation('governance', domainScores.governance)}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(domainScores.governance / 5) * 100}%` }}></div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-green-600 mb-2">Management: {domainScores.management.toFixed(1)}/5.0</h3>
                <p className="text-gray-700 mb-2">
                  {getDomainRecommendation('management', domainScores.management)}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${(domainScores.management / 5) * 100}%` }}></div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-yellow-600 mb-2">Operations: {domainScores.operations.toFixed(1)}/5.0</h3>
                <p className="text-gray-700 mb-2">
                  {getDomainRecommendation('operations', domainScores.operations)}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-yellow-600 h-2.5 rounded-full" style={{ width: `${(domainScores.operations / 5) * 100}%` }}></div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-red-600 mb-2">Resources: {domainScores.resources.toFixed(1)}/5.0</h3>
                <p className="text-gray-700 mb-2">
                  {getDomainRecommendation('resources', domainScores.resources)}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-red-600 h-2.5 rounded-full" style={{ width: `${(domainScores.resources / 5) * 100}%` }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">Key Recommendations</h2>
            
            <div className="space-y-4">
              {domainScores.governance < 3.5 && (
                <div className="bg-blue-50 p-4 rounded-md border-l-4 border-blue-500">
                  <h3 className="text-lg font-semibold text-blue-700 mb-2">Governance Improvements</h3>
                  <p className="text-blue-700">
                    {domainScores.governance < 2.5 ? 
                      "Establish formal PKI policies and a governance structure with clear roles and responsibilities." : 
                      "Enhance your governance by implementing regular policy reviews and formalizing the risk management framework."}
                  </p>
                </div>
              )}
              
              {domainScores.management < 3.5 && (
                <div className="bg-green-50 p-4 rounded-md border-l-4 border-green-500">
                  <h3 className="text-lg font-semibold text-green-700 mb-2">Management Improvements</h3>
                  <p className="text-green-700">
                    {domainScores.management < 2.5 ? 
                      "Implement a comprehensive certificate inventory and establish consistent lifecycle management processes." : 
                      "Enhance your management practices with automated certificate tracking and improved private key controls."}
                  </p>
                </div>
              )}
              
              {domainScores.operations < 3.5 && (
                <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-500">
                  <h3 className="text-lg font-semibold text-yellow-700 mb-2">Operations Improvements</h3>
                  <p className="text-yellow-700">
                    {domainScores.operations < 2.5 ? 
                      "Develop and document PKI-specific incident response and business continuity plans." : 
                      "Enhance your operations by implementing more comprehensive monitoring and automation for certificate deployment."}
                  </p>
                </div>
              )}
              
              {domainScores.resources < 3.5 && (
                <div className="bg-red-50 p-4 rounded-md border-l-4 border-red-500">
                  <h3 className="text-lg font-semibold text-red-700 mb-2">Resources Improvements</h3>
                  <p className="text-red-700">
                    {domainScores.resources < 2.5 ? 
                      "Invest in dedicated PKI expertise and implement basic training programs for administrators." : 
                      "Enhance your resource allocation with improved tools and secure executive support for PKI initiatives."}
                  </p>
                </div>
              )}
              
              {(domainScores.governance >= 3.5 && domainScores.management >= 3.5 && 
                domainScores.operations >= 3.5 && domainScores.resources >= 3.5) && (
                <div className="bg-indigo-50 p-4 rounded-md border-l-4 border-indigo-500">
                  <h3 className="text-lg font-semibold text-indigo-700 mb-2">Advanced Optimization</h3>
                  <p className="text-indigo-700">
                    Your PKI maturity is at a high level across all domains. Consider advanced optimizations like:
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Implementing automation and AI for predictive certificate management</li>
                      <li>Integrating PKI with cloud services and DevOps pipelines</li>
                      <li>Exploring blockchain or distributed ledger technologies for certificate transparency</li>
                      <li>Developing advanced metrics and analytics for continuous improvement</li>
                    </ul>
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8">
        <Button variant="outline" asChild>
          <Link to="/" className="flex items-center gap-2">
            <ChevronLeft size={16} />
            Back to Overview
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Report;
