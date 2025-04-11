
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ScoreCardProps {
  title: string;
  score: number;
  color?: string;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ title, score, color = 'bg-pki-blue' }) => {
  // Determine color based on score
  let scoreColor = 'text-yellow-500';
  if (score >= 4) scoreColor = 'text-green-500';
  else if (score >= 3) scoreColor = 'text-blue-500';
  else if (score >= 2) scoreColor = 'text-orange-500';
  else if (score > 0) scoreColor = 'text-red-500';

  return (
    <Card className={`border-t-4 ${color}`}>
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <div className={`text-4xl font-bold mt-2 ${scoreColor}`}>
          {score > 0 ? score.toFixed(1) : 'N/A'}
        </div>
        <div className="text-sm text-gray-500 mt-1">out of 5.0</div>
      </CardContent>
    </Card>
  );
};

export default ScoreCard;
