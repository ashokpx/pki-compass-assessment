import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip, Legend, PolarRadiusAxis } from 'recharts';
import { useAssessment, Question, governanceQuestions, managementQuestions, operationsQuestions, resourcesQuestions } from '@/contexts/AssessmentContext';
import { Card } from 'flowbite-react';

interface RadarChartProps {
  size?: 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
  showLegend?: boolean;
  showFullMark?: boolean;
  showDetailedView?: boolean;
  className?: string;
}

const RadarChartComponent: React.FC<RadarChartProps> = ({ 
  size = 'lg', 
  showTooltip = true,
  showLegend = true,
  showFullMark = true,
  showDetailedView = false,
  className 
}) => {
  const { domainScores, getQuestionScore } = useAssessment();
  
  // For domain overview (default view)
  const domainData = [
    { subject: 'Governance', score: domainScores.governance, fullMark: 5 },
    { subject: 'Management', score: domainScores.management, fullMark: 5 },
    { subject: 'Operations', score: domainScores.operations, fullMark: 5 },
    { subject: 'Resources', score: domainScores.resources, fullMark: 5 },
  ];

  // For detailed question view
  const getQuestionLabel = (question: Question, index: number, domain: string): string => {
    const prefix = domain.charAt(0).toUpperCase();
    return `${prefix}.${index + 1}`;
  };

  const allQuestions = [
    ...governanceQuestions.map((q, i) => ({ 
      question: q, 
      subject: getQuestionLabel(q, i, 'governance'),
      domain: 'Governance'
    })),
    ...managementQuestions.map((q, i) => ({ 
      question: q, 
      subject: getQuestionLabel(q, i, 'management'),
      domain: 'Management'
    })),
    ...operationsQuestions.map((q, i) => ({ 
      question: q, 
      subject: getQuestionLabel(q, i, 'operations'),
      domain: 'Operations'
    })),
    ...resourcesQuestions.map((q, i) => ({ 
      question: q, 
      subject: getQuestionLabel(q, i, 'resources'),
      domain: 'Resources'
    }))
  ];

  const detailedData = allQuestions.map(({ question, subject, domain }) => ({
    subject,
    domain,
    score: getQuestionScore(question.id),
    fullMark: 5,
    tooltipText: question.text
  }));

  const data = showDetailedView ? detailedData : domainData;

  const chartConfig = {
    score: {
      fill: '#b875dc',
      stroke: '#b875dc',
      fillOpacity: 0.4
    },
    fullMark: {
      fill: '#dddddd',
      stroke: '#dddddd',
      fillOpacity: 0.1
    }
  };

  // Height based on size prop
  const heightClass = 
    size === 'sm' ? 'h-48' : 
    size === 'md' ? 'h-72' : 
    'h-96';

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 shadow-md rounded-md border border-gray-200">
          <p className="text-sm font-medium">{data.subject}</p>
          {data.tooltipText && <p className="text-xs text-gray-600">{data.tooltipText}</p>}
          <p className="text-sm font-semibold text-purple-600">Score: {data.score}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={`w-full ${heightClass} ${className}`}>
      <div className="h-1.5 w-full bg-purple-500"></div>
      <div className="p-4 h-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart 
            outerRadius="80%" 
            data={data}
          >
            <PolarGrid gridType="polygon" stroke="#ccc" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ 
                fill: '#555',
                fontSize: size === 'sm' ? 10 : 12,
                fontWeight: 'bold' 
              }} 
            />
            <PolarRadiusAxis 
              domain={[0, 5]} 
              tickCount={6} 
              axisLine={true}
              tick={{ fontSize: 10 }}
            />
            <Radar
              name="Achieved PKI Maturity Level"
              dataKey="score"
              stroke={chartConfig.score.stroke}
              fill={chartConfig.score.fill}
              fillOpacity={chartConfig.score.fillOpacity}
              dot={true}
            />
            {showFullMark && (
              <Radar
                name="Maximum Score"
                dataKey="fullMark"
                stroke={chartConfig.fullMark.stroke}
                fill={chartConfig.fullMark.fill}
                fillOpacity={chartConfig.fullMark.fillOpacity}
                dot={false}
              />
            )}
            {showTooltip && (
              <Tooltip content={<CustomTooltip />} />
            )}
            {showLegend && <Legend />}
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default RadarChartComponent;
