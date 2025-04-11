import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ScoreCardProps {
  title: string;
  score: number;
  color?: string;
  maxScore?: number;
  showAnimation?: boolean;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ 
  title, 
  score, 
  color = 'border-t-blue-600',
  maxScore = 5,
  showAnimation = true
}) => {
  const [prevScore, setPrevScore] = useState(score);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Determine the color based on the score
  const getScoreColor = (score: number): string => {
    if (score === 0) return 'gray';
    if (score >= 4) return 'green';
    if (score >= 3) return 'blue';
    if (score >= 2) return 'yellow';
    return 'red';
  };
  
  // Animation for score changes
  useEffect(() => {
    if (score !== prevScore && showAnimation) {
      setPrevScore(score);
      setIsAnimating(true);
      
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [score, prevScore, showAnimation]);
  
  // Calculate the percentage for the gauge
  const percentage = Math.round((score / maxScore) * 100);
  
  // Get the progress color classes
  const getProgressColorClasses = (score: number): string => {
    if (score === 0) return 'bg-gray-500';
    if (score >= 4) return 'bg-green-500';
    if (score >= 3) return 'bg-blue-500';
    if (score >= 2) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  const progressColorClass = getProgressColorClasses(score);
  
  return (
    <div className="max-w-sm rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className={`h-1.5 w-full ${color}`}></div>
      <div className="p-4 flex flex-col items-center">
        <h3 className="text-lg font-medium text-gray-700 dark:text-white mb-4">{title}</h3>
        
        <div className="w-full mb-4 flex flex-col items-center">
          <div className="relative w-24 h-24 flex items-center justify-center mb-2">
            {/* Circular progress indicator */}
            <div className="w-24 h-24 rounded-full border-8 border-gray-100 dark:border-gray-700"></div>
            <div 
              className={`absolute top-0 left-0 w-24 h-24 rounded-full border-8 border-transparent ${progressColorClass} dark:${progressColorClass}`} 
              style={{ 
                clipPath: `polygon(50% 50%, 50% 0%, ${percentage <= 25 
                  ? `${50 + percentage * 2}% 0` 
                  : percentage <= 50 
                    ? '100% 0, 100% ' + (percentage - 25) * 4 + '%' 
                    : percentage <= 75 
                      ? '100% 100%, ' + (100 - (percentage - 50) * 4) + '% 100%' 
                      : (100 - (percentage - 75) * 4) + '% 50%'
                })`
              }}
            ></div>
            
            {/* Score text */}
            <div className="absolute">
              <motion.div
                initial={isAnimating ? { scale: 1.2 } : { scale: 1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold text-gray-800 dark:text-white"
              >
                {score > 0 ? score.toFixed(1) : 'N/A'}
              </motion.div>
            </div>
          </div>
          
          {/* Linear progress bar */}
          <div className="w-full">
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div 
                className={`${progressColorClass} h-2.5 rounded-full`} 
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
              Score: {score.toFixed(1)}/{maxScore}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
