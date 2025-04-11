
import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip, Legend, PolarRadiusAxis } from 'recharts';
import { useAssessment, DomainScore } from '@/contexts/AssessmentContext';
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
  className?: string;
}

const RadarChartComponent: React.FC<RadarChartProps> = ({ 
  size = 'lg', 
  showTooltip = true,
  showLegend = true,
  showFullMark = true,
  className 
}) => {
  const { domainScores } = useAssessment();
  
  const data = [
    { subject: 'Governance', score: domainScores.governance, fullMark: 5 },
    { subject: 'Management', score: domainScores.management, fullMark: 5 },
    { subject: 'Operations', score: domainScores.operations, fullMark: 5 },
    { subject: 'Resources', score: domainScores.resources, fullMark: 5 },
  ];

  const chartConfig = {
    score: {
      label: 'Current Score',
      theme: {
        light: '#2270e0',
        dark: '#2270e0',
      },
    },
    fullMark: {
      label: 'Maximum Score',
      theme: {
        light: '#cccccc',
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
        <RadarChart outerRadius="80%" data={data}>
          <PolarGrid stroke="#ccc" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ 
              fill: '#555',
              fontSize: size === 'sm' ? 10 : 12,
              fontWeight: 'bold' 
            }} 
          />
          <PolarRadiusAxis domain={[0, 5]} tickCount={6} />
          <Radar
            name="Current Score"
            dataKey="score"
            stroke="#2270e0"
            fill="#2270e0"
            fillOpacity={0.5}
          />
          {showFullMark && (
            <Radar
              name="Maximum Score"
              dataKey="fullMark"
              stroke="#cccccc"
              fill="#cccccc"
              fillOpacity={0.3}
            />
          )}
          {showTooltip && (
            <ChartTooltip content={<ChartTooltipContent />} />
          )}
          {showLegend && <Legend />}
        </RadarChart>
      </ChartContainer>
    </div>
  );
};

export default RadarChartComponent;
