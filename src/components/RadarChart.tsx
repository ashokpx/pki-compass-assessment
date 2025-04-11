
import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip, Legend, PolarRadiusAxis } from 'recharts';
import { useAssessment, Question, governanceQuestions, managementQuestions, operationsQuestions, resourcesQuestions } from '@/contexts/AssessmentContext';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';

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
      label: 'Achieved PKI Maturity Level',
      theme: {
        light: '#b875dc', // Purple color as in the screenshot
        dark: '#b875dc',
      },
    },
    fullMark: {
      label: 'Maximum Score',
      theme: {
        light: '#dddddd',
        dark: '#555555',
      },
    },
  };

  // Height based on size prop
  const heightClass = 
    size === 'sm' ? 'h-48' : 
    size === 'md' ? 'h-72' : 
    'h-96';

  return (
    <div className={`w-full ${heightClass} ${className}`}>
      <ChartContainer config={chartConfig} className="w-full h-full">
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
            name={chartConfig.score.label}
            dataKey="score"
            stroke={chartConfig.score.theme.light}
            fill={chartConfig.score.theme.light}
            fillOpacity={0.4}
            dot={true}
          />
          {showFullMark && (
            <Radar
              name={chartConfig.fullMark.label}
              dataKey="fullMark"
              stroke={chartConfig.fullMark.theme.light}
              fill={chartConfig.fullMark.theme.light}
              fillOpacity={0.1}
              dot={false}
            />
          )}
          {showTooltip && (
            <ChartTooltip content={
              <ChartTooltipContent 
                formatter={(value, name, entry) => {
                  // @ts-ignore - tooltipText is a custom property
                  const tooltipText = entry.payload.tooltipText;
                  if (tooltipText && showDetailedView) {
                    return [value, `${name}: ${tooltipText}`];
                  }
                  return [value, name];
                }}
              />
            } />
          )}
          {showLegend && <Legend />}
        </RadarChart>
      </ChartContainer>
    </div>
  );
};

export default RadarChartComponent;
