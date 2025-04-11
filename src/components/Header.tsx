
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center py-4">
          <div className="flex items-center mb-4 md:mb-0">
            <Link to="/" className="text-2xl font-bold text-pki-blue flex items-center">
              <span className="mr-2">📊</span>
              PKI Compass
            </Link>
          </div>
          
          <nav className="flex flex-wrap justify-center">
            <Link 
              to="/" 
              className={`px-4 py-2 mx-1 rounded-md transition-colors ${
                isActive('/') ? 'bg-pki-blue text-white' : 'text-pki-darkGray hover:bg-pki-lightBlue'
              }`}
            >
              Overview
            </Link>
            <Link 
              to="/governance" 
              className={`px-4 py-2 mx-1 rounded-md transition-colors ${
                isActive('/governance') ? 'bg-pki-blue text-white' : 'text-pki-darkGray hover:bg-pki-lightBlue'
              }`}
            >
              Governance
            </Link>
            <Link 
              to="/management" 
              className={`px-4 py-2 mx-1 rounded-md transition-colors ${
                isActive('/management') ? 'bg-pki-blue text-white' : 'text-pki-darkGray hover:bg-pki-lightBlue'
              }`}
            >
              Management
            </Link>
            <Link 
              to="/operations" 
              className={`px-4 py-2 mx-1 rounded-md transition-colors ${
                isActive('/operations') ? 'bg-pki-blue text-white' : 'text-pki-darkGray hover:bg-pki-lightBlue'
              }`}
            >
              Operations
            </Link>
            <Link 
              to="/resources" 
              className={`px-4 py-2 mx-1 rounded-md transition-colors ${
                isActive('/resources') ? 'bg-pki-blue text-white' : 'text-pki-darkGray hover:bg-pki-lightBlue'
              }`}
            >
              Resources
            </Link>
            <Link 
              to="/report" 
              className={`px-4 py-2 mx-1 rounded-md transition-colors ${
                isActive('/report') ? 'bg-pki-blue text-white' : 'text-pki-darkGray hover:bg-pki-lightBlue'
              }`}
            >
              Report
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
