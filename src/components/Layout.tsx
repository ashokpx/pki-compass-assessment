
import React from 'react';
import Header from './Header';
import { AssessmentProvider } from '@/contexts/AssessmentContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AssessmentProvider>
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="bg-pki-gray py-6">
          <div className="container mx-auto px-4">
            <p className="text-center text-sm text-pki-darkGray">
              © {new Date().getFullYear()} PKI Compass Assessment Tool. Based on PKI Consortium's self-assessment tool.
            </p>
          </div>
        </footer>
      </div>
    </AssessmentProvider>
  );
};

export default Layout;
