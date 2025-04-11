import React from 'react';
import { useAssessment, governanceQuestions, managementQuestions, operationsQuestions, resourcesQuestions } from '@/contexts/AssessmentContext';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip, PolarRadiusAxis } from 'recharts';

interface SpiderGraphProps {
  className?: string;
}

const SpiderGraph: React.FC<SpiderGraphProps> = ({ className }) => {
  const { getQuestionScore } = useAssessment();
  
  // Create detailed data with labels formatted as shown in the image (G.1, G.2, M.5, etc.)
  const governanceData = governanceQuestions.map((q, idx) => ({
    subject: `G.${idx + 1}`,
    score: getQuestionScore(q.id),
    fullMark: 5,
    question: q.text
  }));
  
  const managementData = managementQuestions.map((q, idx) => ({
    subject: `M.${idx + 1}`,
    score: getQuestionScore(q.id),
    fullMark: 5,
    question: q.text
  }));
  
  const operationsData = operationsQuestions.map((q, idx) => ({
    subject: `O.${idx + 1}`,
    score: getQuestionScore(q.id),
    fullMark: 5,
    question: q.text
  }));
  
  const resourcesData = resourcesQuestions.map((q, idx) => ({
    subject: `R.${idx + 1}`,
    score: getQuestionScore(q.id),
    fullMark: 5,
    question: q.text
  }));
  
  // Combine all data points
  const data = [...governanceData, ...managementData, ...operationsData, ...resourcesData];

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-md rounded text-xs">
          <p className="font-medium">{payload[0].payload.subject}</p>
          <p className="text-gray-700">{payload[0].payload.question}</p>
          <p className="font-medium text-pki-blue">Score: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };
  
  // Custom legend to match the reference image
  const CustomLegend = () => (
    <div className="flex items-center gap-2 justify-center mt-3">
      <div className="w-4 h-4 bg-purple-300"></div>
      <span className="text-xs text-gray-600">Achieved PKI Maturity Level</span>
    </div>
  );

  return (
    <div className={`w-full h-full flex flex-col ${className}`}>
      <ResponsiveContainer width="100%" height="90%">
        <RadarChart 
          cx="50%" 
          cy="50%" 
          outerRadius="80%" 
          data={data}
        >
          <PolarGrid stroke="#e5e5e5" />
          <PolarAngleAxis 
            dataKey="subject"
            tick={{ 
              fill: '#666',
              fontSize: 10, 
            }}
          />
          <PolarRadiusAxis 
            domain={[0, 5]}
            tickCount={6}
          />
          <Radar
            name="Achieved PKI Maturity Level"
            dataKey="score"
            stroke="#b875dc"
            fill="#b875dc"
            fillOpacity={0.4}
            dot
          />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
      <CustomLegend />
    </div>
  );
};

export default SpiderGraph; 