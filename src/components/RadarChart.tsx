
import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip, Legend } from 'recharts';
import { useAssessment, DomainScore } from '@/contexts/AssessmentContext';

const RadarChartComponent: React.FC = () => {
  const { domainScores } = useAssessment();
  
  const data = [
    { subject: 'Governance', score: domainScores.governance, fullMark: 5 },
    { subject: 'Management', score: domainScores.management, fullMark: 5 },
    { subject: 'Operations', score: domainScores.operations, fullMark: 5 },
    { subject: 'Resources', score: domainScores.resources, fullMark: 5 },
  ];

  return (
    <div className="h-96 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#555' }} />
          <Radar
            name="Current Score"
            dataKey="score"
            stroke="#2270e0"
            fill="#2270e0"
            fillOpacity={0.5}
          />
          <Tooltip />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarChartComponent;
