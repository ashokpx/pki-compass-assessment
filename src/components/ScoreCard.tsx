
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface ScoreCardProps {
  title: string;
  score: number;
  color?: string;
  showAnimation?: boolean;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ 
  title, 
  score, 
  color = 'border-t-pki-blue',
  showAnimation = true 
}) => {
  const [prevScore, setPrevScore] = useState(score);
  const [isIncreased, setIsIncreased] = useState(false);
  const [isDecreased, setIsDecreased] = useState(false);
  
  useEffect(() => {
    if (score !== prevScore) {
      setIsIncreased(score > prevScore);
      setIsDecreased(score < prevScore);
      setPrevScore(score);
      
      const timer = setTimeout(() => {
        setIsIncreased(false);
        setIsDecreased(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [score, prevScore]);
  
  // Determine color based on score
  let scoreColor = 'text-yellow-500';
  if (score >= 4) scoreColor = 'text-green-500';
  else if (score >= 3) scoreColor = 'text-blue-500';
  else if (score >= 2) scoreColor = 'text-orange-500';
  else if (score > 0) scoreColor = 'text-red-500';

  return (
    <Card className={`border-t-4 ${color} transition-all duration-300`}>
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        {showAnimation ? (
          <motion.div 
            className={`text-4xl font-bold mt-2 ${scoreColor}`}
            initial={{ scale: 1 }}
            animate={{ 
              scale: isIncreased || isDecreased ? [1, 1.1, 1] : 1,
              color: isIncreased ? ['#00c853', scoreColor] : 
                    isDecreased ? ['#ff5252', scoreColor] : scoreColor
            }}
            transition={{ duration: 0.5 }}
          >
            {score > 0 ? score.toFixed(1) : 'N/A'}
          </motion.div>
        ) : (
          <div className={`text-4xl font-bold mt-2 ${scoreColor}`}>
            {score > 0 ? score.toFixed(1) : 'N/A'}
          </div>
        )}
        <div className="text-sm text-gray-500 mt-1">out of 5.0</div>
      </CardContent>
    </Card>
  );
};

export default ScoreCard;
