import React from 'react';
import { useAssessment } from '@/contexts/AssessmentContext';
import { HiMoon, HiSun, HiRefresh } from 'react-icons/hi';
import { useTheme } from '@/theme-provider';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { resetAssessment } = useAssessment();
  const { darkMode, toggleDarkMode } = useTheme();
  
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the assessment? All your answers will be lost.')) {
      resetAssessment();
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center mr-3">
              <span className="text-white font-bold">PKI</span>
            </div>
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              PKI Maturity Assessment
            </span>
          </div>
          <div className="flex gap-2">
            <button 
              className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none rounded-lg text-sm p-2.5"
              onClick={toggleDarkMode}
            >
              {darkMode ? <HiSun className="h-5 w-5" /> : <HiMoon className="h-5 w-5" />}
            </button>
            <button 
              className="text-red-700 bg-white border border-red-700 hover:bg-red-50 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center"
              onClick={handleReset}
            >
              <HiRefresh className="mr-2 h-5 w-5" />
              Reset Assessment
            </button>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-grow py-6 dark:text-white">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 px-6 dark:bg-gray-800 dark:border-gray-700">
        <div className="container mx-auto text-center text-sm text-gray-500 dark:text-gray-400">
          <p>PKI Maturity Assessment Tool &copy; {new Date().getFullYear()}</p>
          <p className="mt-1">Complete all questions across domains for a comprehensive assessment of your PKI maturity</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
