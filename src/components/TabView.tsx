import React, { useState } from 'react';
import { 
  useAssessment, 
  governanceQuestions, 
  managementQuestions, 
  operationsQuestions, 
  resourcesQuestions 
} from '@/contexts/AssessmentContext';
import QuestionCard from '@/components/QuestionCard';
import { HiShieldCheck, HiChartBar, HiTerminal, HiBookOpen, HiDocumentText, HiChevronRight, HiDownload, HiArrowRight } from 'react-icons/hi';
import SpiderGraph from '@/components/SpiderGraph';

// Create a custom tabs component since Flowbite's Tabs API is causing TypeScript issues
const CustomTabs = ({ children, activeTab, onTabChange }) => {
  const tabs = [
    { id: "governance", label: "Governance", icon: <HiShieldCheck className="h-5 w-5 text-blue-600" /> },
    { id: "management", label: "Management", icon: <HiChartBar className="h-5 w-5 text-green-600" /> },
    { id: "operations", label: "Operations", icon: <HiTerminal className="h-5 w-5 text-yellow-600" /> },
    { id: "resources", label: "Resources", icon: <HiBookOpen className="h-5 w-5 text-red-600" /> },
    { id: "report", label: "Report", icon: <HiDocumentText className="h-5 w-5 text-purple-600" /> }
  ];
  
  return (
    <div>
      <div className="border-b border-gray-200 mb-4">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
          {tabs.map(tab => (
            <li key={tab.id} className="mr-2">
              <button
                className={`inline-flex items-center p-4 border-b-2 rounded-t-lg ${
                  activeTab === tab.id 
                    ? `text-${tab.id === 'governance' ? 'blue' : 
                        tab.id === 'management' ? 'green' : 
                        tab.id === 'operations' ? 'yellow' : 
                        tab.id === 'resources' ? 'red' : 'purple'
                      }-600 border-${tab.id === 'governance' ? 'blue' : 
                        tab.id === 'management' ? 'green' : 
                        tab.id === 'operations' ? 'yellow' : 
                        tab.id === 'resources' ? 'red' : 'purple'
                      }-600 active` 
                    : 'border-transparent hover:text-gray-600 hover:border-gray-300'
                }`}
                onClick={() => onTabChange(tab.id)}
              >
                {tab.icon}
                <span className="ml-2 hidden sm:inline">{tab.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>{children}</div>
    </div>
  );
};

const TabView: React.FC = () => {
  const { domainScores, overallScore, answers } = useAssessment();
  const [activeTab, setActiveTab] = useState("governance");
  
  // Make all questions scorable by removing isReadOnly flag
  const scorableGovernanceQuestions = governanceQuestions.map(question => ({
    ...question,
    isReadOnly: false
  }));
  
  const scorableManagementQuestions = managementQuestions.map(question => ({
    ...question,
    isReadOnly: false
  }));
  
  const scorableOperationsQuestions = operationsQuestions.map(question => ({
    ...question,
    isReadOnly: false
  }));
  
  const scorableResourcesQuestions = resourcesQuestions.map(question => ({
    ...question,
    isReadOnly: false
  }));
  
  // Progress tracking for each domain
  const getCompletionPercentage = (questions, domainKey) => {
    const totalQuestions = questions.length;
    if (totalQuestions === 0) return 0;
    
    const answeredQuestions = questions.filter(q => 
      answers.some(a => a.questionId === q.id)
    ).length;
    
    return Math.round((answeredQuestions / totalQuestions) * 100);
  };
  
  const governanceCompletion = getCompletionPercentage(scorableGovernanceQuestions, 'governance');
  const managementCompletion = getCompletionPercentage(scorableManagementQuestions, 'management');
  const operationsCompletion = getCompletionPercentage(scorableOperationsQuestions, 'operations');
  const resourcesCompletion = getCompletionPercentage(scorableResourcesQuestions, 'resources');
  
  // Handle navigation between tabs
  const handleContinue = () => {
    if (activeTab === "governance") {
      setActiveTab("management");
    } else if (activeTab === "management") {
      setActiveTab("operations");
    } else if (activeTab === "operations") {
      setActiveTab("resources");
    } else if (activeTab === "resources") {
      setActiveTab("report");
    }
  };
  
  // Generate report data
  const allQuestions = [
    ...scorableGovernanceQuestions,
    ...scorableManagementQuestions,
    ...scorableOperationsQuestions,
    ...scorableResourcesQuestions
  ];
  
  const handleDownloadReport = () => {
    // Create report content
    let reportContent = `PKI Maturity Assessment Report\n\n`;
    reportContent += `Date: ${new Date().toLocaleDateString()}\n\n`;
    reportContent += `Overall Score: ${overallScore > 0 ? overallScore.toFixed(1) : 'N/A'}/5.0\n\n`;
    reportContent += `Domain Scores:\n`;
    reportContent += `- Governance: ${domainScores.governance > 0 ? domainScores.governance.toFixed(1) : 'N/A'}/5.0\n`;
    reportContent += `- Management: ${domainScores.management > 0 ? domainScores.management.toFixed(1) : 'N/A'}/5.0\n`;
    reportContent += `- Operations: ${domainScores.operations > 0 ? domainScores.operations.toFixed(1) : 'N/A'}/5.0\n`;
    reportContent += `- Resources: ${domainScores.resources > 0 ? domainScores.resources.toFixed(1) : 'N/A'}/5.0\n\n`;
    
    // Add detailed answers
    reportContent += `Detailed Responses:\n\n`;
    
    allQuestions.forEach(q => {
      const answer = answers.find(a => a.questionId === q.id);
      const score = answer ? answer.score : 'Not answered';
      const selectedOption = answer 
        ? q.options.find(o => o.value === answer.score)?.label || 'Unknown'
        : 'Not answered';
        
      reportContent += `${q.domain.toUpperCase()}: ${q.text}\n`;
      reportContent += `Score: ${score}/5\n`;
      reportContent += `Response: ${selectedOption}\n\n`;
    });
    
    // Create and download the file
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pki-maturity-assessment-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Render the active tab content
  const renderTabContent = () => {
    switch(activeTab) {
      case 'governance':
        return (
          <div className="p-4 pt-0 max-h-[65vh] overflow-y-auto">
            <p className="text-gray-600 mb-4">
              This section evaluates your PKI governance policies, structure, risk management framework, and compliance.
            </p>
            {scorableGovernanceQuestions.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
            <div className="flex justify-end mt-6">
              <button 
                onClick={handleContinue}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Continue to Management
              </button>
            </div>
          </div>
        );
      case 'management':
        return (
          <div className="p-4 pt-0 max-h-[65vh] overflow-y-auto">
            <p className="text-gray-600 mb-4">
              This section evaluates your certificate inventory, lifecycle management, renewal processes, and key management.
            </p>
            {scorableManagementQuestions.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
            <div className="flex justify-between mt-6">
              <button 
                onClick={() => setActiveTab("governance")}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Back to Governance
              </button>
              <button 
                onClick={handleContinue}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Continue to Operations
              </button>
            </div>
          </div>
        );
      case 'operations':
        return (
          <div className="p-4 pt-0 max-h-[65vh] overflow-y-auto">
            <p className="text-gray-600 mb-4">
              This section evaluates your incident response, CA operations, business continuity, and PKI monitoring.
            </p>
            {scorableOperationsQuestions.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
            <div className="flex justify-between mt-6">
              <button 
                onClick={() => setActiveTab("management")}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Back to Management
              </button>
              <button 
                onClick={handleContinue}
                className="px-4 py-2 bg-yellow-500 text-white rounded"
              >
                Continue to Resources
              </button>
            </div>
          </div>
        );
      case 'resources':
        return (
          <div className="p-4 pt-0 max-h-[65vh] overflow-y-auto">
            <p className="text-gray-600 mb-4">
              This section evaluates your PKI expertise, training programs, management tools, and executive support.
            </p>
            {scorableResourcesQuestions.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
            <div className="flex justify-between mt-6">
              <button 
                onClick={() => setActiveTab("operations")}
                className="px-4 py-2 bg-yellow-500 text-white rounded"
              >
                Back to Operations
              </button>
              <button 
                onClick={handleContinue}
                className="px-4 py-2 bg-purple-500 text-white rounded"
              >
                Finish & View Report
              </button>
            </div>
          </div>
        );
      case 'report':
        return (
          <div className="p-4 pt-0 max-h-[65vh] overflow-y-auto">
            <div className="mb-6">
              <h3 className="text-md font-semibold text-blue-700 mb-2 flex items-center gap-2">
                <HiShieldCheck className="h-5 w-5" /> Governance Results
              </h3>
              <div className="space-y-3 pl-6">
                {scorableGovernanceQuestions.map(q => {
                  const answer = answers.find(a => a.questionId === q.id);
                  const scoreValue = answer ? answer.score : 0;
                  const scoreText = answer 
                    ? `${scoreValue}/5 - ${q.options.find(o => o.value === scoreValue)?.label || 'Unknown'}`
                    : 'Not answered';
                  
                  return (
                    <div key={q.id} className="border-b border-gray-100 pb-2">
                      <div className="font-medium text-gray-700">{q.text}</div>
                      <span className={`px-2 py-1 rounded ${
                        !answer ? 'text-gray-500' :
                        scoreValue >= 4 ? 'bg-green-200 text-green-800' :
                        scoreValue >= 3 ? 'bg-yellow-200 text-yellow-800' :
                        scoreValue >= 2 ? 'bg-yellow-200 text-yellow-800' :
                        'bg-red-200 text-red-800'
                      }`}>
                        {scoreText}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-md font-semibold text-green-700 mb-2 flex items-center gap-2">
                <HiChartBar className="h-5 w-5" /> Management Results
              </h3>
              <div className="space-y-3 pl-6">
                {scorableManagementQuestions.map(q => {
                  const answer = answers.find(a => a.questionId === q.id);
                  const scoreValue = answer ? answer.score : 0;
                  const scoreText = answer 
                    ? `${scoreValue}/5 - ${q.options.find(o => o.value === scoreValue)?.label || 'Unknown'}`
                    : 'Not answered';
                  
                  return (
                    <div key={q.id} className="border-b border-gray-100 pb-2">
                      <div className="font-medium text-gray-700">{q.text}</div>
                      <span className={`px-2 py-1 rounded ${
                        !answer ? 'text-gray-500' :
                        scoreValue >= 4 ? 'bg-green-200 text-green-800' :
                        scoreValue >= 3 ? 'bg-yellow-200 text-yellow-800' :
                        scoreValue >= 2 ? 'bg-yellow-200 text-yellow-800' :
                        'bg-red-200 text-red-800'
                      }`}>
                        {scoreText}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-md font-semibold text-yellow-700 mb-2 flex items-center gap-2">
                <HiTerminal className="h-5 w-5" /> Operations Results
              </h3>
              <div className="space-y-3 pl-6">
                {scorableOperationsQuestions.map(q => {
                  const answer = answers.find(a => a.questionId === q.id);
                  const scoreValue = answer ? answer.score : 0;
                  const scoreText = answer 
                    ? `${scoreValue}/5 - ${q.options.find(o => o.value === scoreValue)?.label || 'Unknown'}`
                    : 'Not answered';
                  
                  return (
                    <div key={q.id} className="border-b border-gray-100 pb-2">
                      <div className="font-medium text-gray-700">{q.text}</div>
                      <span className={`px-2 py-1 rounded ${
                        !answer ? 'text-gray-500' :
                        scoreValue >= 4 ? 'bg-green-200 text-green-800' :
                        scoreValue >= 3 ? 'bg-yellow-200 text-yellow-800' :
                        scoreValue >= 2 ? 'bg-yellow-200 text-yellow-800' :
                        'bg-red-200 text-red-800'
                      }`}>
                        {scoreText}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-md font-semibold text-red-700 mb-2 flex items-center gap-2">
                <HiBookOpen className="h-5 w-5" /> Resources Results
              </h3>
              <div className="space-y-3 pl-6">
                {scorableResourcesQuestions.map(q => {
                  const answer = answers.find(a => a.questionId === q.id);
                  const scoreValue = answer ? answer.score : 0;
                  const scoreText = answer 
                    ? `${scoreValue}/5 - ${q.options.find(o => o.value === scoreValue)?.label || 'Unknown'}`
                    : 'Not answered';
                  
                  return (
                    <div key={q.id} className="border-b border-gray-100 pb-2">
                      <div className="font-medium text-gray-700">{q.text}</div>
                      <span className={`px-2 py-1 rounded ${
                        !answer ? 'text-gray-500' :
                        scoreValue >= 4 ? 'bg-green-200 text-green-800' :
                        scoreValue >= 3 ? 'bg-yellow-200 text-yellow-800' :
                        scoreValue >= 2 ? 'bg-yellow-200 text-yellow-800' :
                        'bg-red-200 text-red-800'
                      }`}>
                        {scoreText}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left side - Spider Graph and Overall Score */}
        <div className="w-full lg:w-1/3">
          <div className="mb-6">
            <div className="h-1.5 w-full bg-purple-500"></div>
            <h5 className="p-4 text-xl font-bold tracking-tight text-gray-700">
              PKI Maturity Assessment
            </h5>
            <div className="p-4 pt-0">
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-blue-600">
                  {overallScore > 0 ? overallScore.toFixed(1) : 'N/A'}
                </div>
                <div className="text-sm text-gray-500">Overall Maturity Score</div>
              </div>
              
              <div className="h-[350px] flex items-center justify-center">
                <SpiderGraph />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-xl font-semibold text-blue-600">
                    {domainScores.governance > 0 ? domainScores.governance.toFixed(1) : 'N/A'}
                  </div>
                  <div className="text-sm text-gray-600">Governance</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-xl font-semibold text-green-600">
                    {domainScores.management > 0 ? domainScores.management.toFixed(1) : 'N/A'}
                  </div>
                  <div className="text-sm text-gray-600">Management</div>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="text-xl font-semibold text-yellow-600">
                    {domainScores.operations > 0 ? domainScores.operations.toFixed(1) : 'N/A'}
                  </div>
                  <div className="text-sm text-gray-600">Operations</div>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-xl font-semibold text-red-600">
                    {domainScores.resources > 0 ? domainScores.resources.toFixed(1) : 'N/A'}
                  </div>
                  <div className="text-sm text-gray-600">Resources</div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="h-1.5 w-full bg-gray-300"></div>
            <h5 className="p-4 text-xl font-bold tracking-tight text-gray-700">
              Assessment Progress
            </h5>
            <div className="p-4 pt-0">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-blue-600 font-medium">Governance</span>
                    <span className="text-gray-500">{governanceCompletion}%</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full">
                    <div className="bg-blue-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: `${governanceCompletion}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-green-600 font-medium">Management</span>
                    <span className="text-gray-500">{managementCompletion}%</span>
                  </div>
                  <div className="w-full bg-green-200 rounded-full">
                    <div className="bg-green-500 text-xs font-medium text-green-100 text-center p-0.5 leading-none rounded-full" style={{ width: `${managementCompletion}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-yellow-600 font-medium">Operations</span>
                    <span className="text-gray-500">{operationsCompletion}%</span>
                  </div>
                  <div className="w-full bg-yellow-200 rounded-full">
                    <div className="bg-yellow-500 text-xs font-medium text-yellow-100 text-center p-0.5 leading-none rounded-full" style={{ width: `${operationsCompletion}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-red-600 font-medium">Resources</span>
                    <span className="text-gray-500">{resourcesCompletion}%</span>
                  </div>
                  <div className="w-full bg-red-200 rounded-full">
                    <div className="bg-red-500 text-xs font-medium text-red-100 text-center p-0.5 leading-none rounded-full" style={{ width: `${resourcesCompletion}%` }}></div>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mt-4">
                Complete all questions across domains for a comprehensive assessment of your PKI maturity.
              </p>
            </div>
          </div>
        </div>
        
        {/* Right side - Assessment Tabs */}
        <div className="w-full lg:w-2/3">
          <CustomTabs activeTab={activeTab} onTabChange={setActiveTab}>
            {renderTabContent()}
          </CustomTabs>
        </div>
      </div>
    </div>
  );
};

export default TabView; 