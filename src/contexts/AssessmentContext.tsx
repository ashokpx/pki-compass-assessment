import React, { createContext, useContext, useState, useEffect } from 'react';

export type DomainScore = {
  governance: number;
  management: number;
  operations: number;
  resources: number;
};

export type Question = {
  id: string;
  text: string;
  domain: keyof DomainScore;
  options: {
    value: number;
    label: string;
  }[];
};

export type Answer = {
  questionId: string;
  score: number;
};

type AssessmentContextType = {
  answers: Answer[];
  domainScores: DomainScore;
  overallScore: number;
  setAnswer: (questionId: string, score: number) => void;
  resetAssessment: () => void;
  getQuestionScore: (questionId: string) => number;
};

const defaultDomainScores: DomainScore = {
  governance: 0,
  management: 0,
  operations: 0,
  resources: 0,
};

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export const useAssessment = () => {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
};

export const AssessmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [domainScores, setDomainScores] = useState<DomainScore>(defaultDomainScores);
  const [overallScore, setOverallScore] = useState<number>(0);

  // Load saved answers from localStorage if available
  useEffect(() => {
    const savedAnswers = localStorage.getItem('pki-assessment-answers');
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
  }, []);

  // Save answers to localStorage when they change
  useEffect(() => {
    localStorage.setItem('pki-assessment-answers', JSON.stringify(answers));
    calculateScores();
  }, [answers]);

  const calculateScores = () => {
    // Group answers by domain
    const domainAnswers: Record<keyof DomainScore, Answer[]> = {
      governance: [],
      management: [],
      operations: [],
      resources: [],
    };

    // Get all questions to know their domains
    const allQuestions = [
      ...governanceQuestions,
      ...managementQuestions,
      ...operationsQuestions,
      ...resourcesQuestions,
    ];

    answers.forEach((answer) => {
      const question = allQuestions.find(q => q.id === answer.questionId);
      if (question) {
        domainAnswers[question.domain].push(answer);
      }
    });

    // Calculate average score for each domain
    const newDomainScores = { ...defaultDomainScores };
    
    Object.entries(domainAnswers).forEach(([domain, domainAnswersList]) => {
      if (domainAnswersList.length > 0) {
        const totalScore = domainAnswersList.reduce((sum, answer) => sum + answer.score, 0);
        newDomainScores[domain as keyof DomainScore] = Math.round((totalScore / domainAnswersList.length) * 10) / 10;
      }
    });

    setDomainScores(newDomainScores);

    // Calculate overall score as average of domain scores
    const domains = Object.keys(newDomainScores) as Array<keyof DomainScore>;
    const totalDomainScores = domains.reduce((sum, domain) => sum + newDomainScores[domain], 0);
    const avg = totalDomainScores / domains.length;
    setOverallScore(Math.round(avg * 10) / 10);
  };

  const setAnswer = (questionId: string, score: number) => {
    setAnswers((prevAnswers) => {
      const existingAnswerIndex = prevAnswers.findIndex(a => a.questionId === questionId);
      
      if (existingAnswerIndex >= 0) {
        const newAnswers = [...prevAnswers];
        newAnswers[existingAnswerIndex] = { questionId, score };
        return newAnswers;
      } else {
        return [...prevAnswers, { questionId, score }];
      }
    });
  };

  const resetAssessment = () => {
    setAnswers([]);
    setDomainScores(defaultDomainScores);
    setOverallScore(0);
    localStorage.removeItem('pki-assessment-answers');
  };

  // Add the new getQuestionScore function
  const getQuestionScore = (questionId: string): number => {
    const answer = answers.find(a => a.questionId === questionId);
    return answer ? answer.score : 0;
  };

  return (
    <AssessmentContext.Provider
      value={{
        answers,
        domainScores,
        overallScore,
        setAnswer,
        resetAssessment,
        getQuestionScore,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
};

// Questions for each domain
export const governanceQuestions: Question[] = [
  {
    id: 'gov1',
    text: 'Do you have a documented PKI policy?',
    domain: 'governance',
    options: [
      { value: 1, label: 'No documented policy exists' },
      { value: 2, label: 'Basic policy exists but is not comprehensive' },
      { value: 3, label: 'Comprehensive policy exists but is not regularly reviewed' },
      { value: 4, label: 'Comprehensive policy exists and is regularly reviewed' },
      { value: 5, label: 'Comprehensive policy exists, is regularly reviewed, and compliance is audited' }
    ]
  },
  {
    id: 'gov2',
    text: 'Is there a defined PKI governance structure?',
    domain: 'governance',
    options: [
      { value: 1, label: 'No defined governance structure' },
      { value: 2, label: 'Basic governance with unclear roles and responsibilities' },
      { value: 3, label: 'Defined governance structure with clear roles' },
      { value: 4, label: 'Well-defined governance with regular oversight' },
      { value: 5, label: 'Comprehensive governance with executive support and regular oversight' }
    ]
  },
  {
    id: 'gov3',
    text: 'Do you have a risk management framework for your PKI?',
    domain: 'governance',
    options: [
      { value: 1, label: 'No risk management framework' },
      { value: 2, label: 'Basic risk identification but no formal management' },
      { value: 3, label: 'Formal risk management framework but inconsistently applied' },
      { value: 4, label: 'Comprehensive risk management with regular assessments' },
      { value: 5, label: 'Advanced risk management integrated with enterprise risk processes' }
    ]
  },
  {
    id: 'gov4',
    text: 'Are certificates aligned with business and compliance needs?',
    domain: 'governance',
    options: [
      { value: 1, label: 'No alignment with business or compliance needs' },
      { value: 2, label: 'Basic alignment with some business needs' },
      { value: 3, label: 'Alignment with business needs and some compliance requirements' },
      { value: 4, label: 'Strong alignment with business and compliance requirements' },
      { value: 5, label: 'Perfect alignment with business strategy and all compliance requirements' }
    ]
  },
  {
    id: 'gov5',
    text: 'Is there a compliance program for certificate management?',
    domain: 'governance',
    options: [
      { value: 1, label: 'No compliance program' },
      { value: 2, label: 'Basic compliance checks but not comprehensive' },
      { value: 3, label: 'Formal compliance program but not regularly audited' },
      { value: 4, label: 'Comprehensive compliance program with regular audits' },
      { value: 5, label: 'Advanced compliance program with continuous monitoring and improvement' }
    ]
  }
];

export const managementQuestions: Question[] = [
  {
    id: 'mgmt1',
    text: 'Do you maintain a complete inventory of certificates?',
    domain: 'management',
    options: [
      { value: 1, label: 'No certificate inventory exists' },
      { value: 2, label: 'Partial inventory of certificates' },
      { value: 3, label: 'Complete inventory but not regularly updated' },
      { value: 4, label: 'Complete inventory that is regularly maintained' },
      { value: 5, label: 'Automated discovery and comprehensive inventory maintenance' }
    ]
  },
  {
    id: 'mgmt2',
    text: 'Is there a certificate lifecycle management process?',
    domain: 'management',
    options: [
      { value: 1, label: 'No defined lifecycle management process' },
      { value: 2, label: 'Basic processes for some lifecycle phases' },
      { value: 3, label: 'Defined processes for the full lifecycle but manual tracking' },
      { value: 4, label: 'Comprehensive lifecycle management with automated tracking' },
      { value: 5, label: 'Advanced lifecycle management with automation and integration' }
    ]
  },
  {
    id: 'mgmt3',
    text: 'How do you manage certificate renewals and expirations?',
    domain: 'management',
    options: [
      { value: 1, label: 'No process for tracking renewals or expirations' },
      { value: 2, label: 'Manual tracking with frequent lapses' },
      { value: 3, label: 'Semi-automated tracking with occasional lapses' },
      { value: 4, label: 'Automated tracking with alerts and minimal lapses' },
      { value: 5, label: 'Fully automated renewal process with no lapses' }
    ]
  },
  {
    id: 'mgmt4',
    text: 'Is there a process for certificate revocation?',
    domain: 'management',
    options: [
      { value: 1, label: 'No defined revocation process' },
      { value: 2, label: 'Basic revocation process but not consistently followed' },
      { value: 3, label: 'Defined revocation process that is manually executed' },
      { value: 4, label: 'Comprehensive revocation process with some automation' },
      { value: 5, label: 'Fully automated and tested revocation process' }
    ]
  },
  {
    id: 'mgmt5',
    text: 'How do you manage private keys?',
    domain: 'management',
    options: [
      { value: 1, label: 'No controls for private key management' },
      { value: 2, label: 'Basic key management with minimal controls' },
      { value: 3, label: 'Defined key management practices but inconsistently applied' },
      { value: 4, label: 'Strong key management practices with hardware protection' },
      { value: 5, label: 'Advanced key management with HSMs and comprehensive controls' }
    ]
  }
];

export const operationsQuestions: Question[] = [
  {
    id: 'ops1',
    text: 'Is there a documented incident response plan for PKI issues?',
    domain: 'operations',
    options: [
      { value: 1, label: 'No incident response plan' },
      { value: 2, label: 'Basic incident response but not PKI-specific' },
      { value: 3, label: 'Documented PKI incident response but not tested' },
      { value: 4, label: 'Comprehensive incident response plan that is regularly tested' },
      { value: 5, label: 'Advanced incident response with automation and integration' }
    ]
  },
  {
    id: 'ops2',
    text: 'How do you manage certificate authority operations?',
    domain: 'operations',
    options: [
      { value: 1, label: 'No defined CA operations procedures' },
      { value: 2, label: 'Basic CA procedures but inconsistently followed' },
      { value: 3, label: 'Documented CA procedures that are manually followed' },
      { value: 4, label: 'Comprehensive CA operations with regular auditing' },
      { value: 5, label: 'Advanced CA operations with automation and separation of duties' }
    ]
  },
  {
    id: 'ops3',
    text: 'Is there a business continuity plan for your PKI?',
    domain: 'operations',
    options: [
      { value: 1, label: 'No business continuity plan' },
      { value: 2, label: 'Basic continuity planning but not tested' },
      { value: 3, label: 'Documented continuity plan but rarely tested' },
      { value: 4, label: 'Comprehensive continuity plan that is regularly tested' },
      { value: 5, label: 'Advanced continuity planning with automation and redundancy' }
    ]
  },
  {
    id: 'ops4',
    text: 'How is certificate deployment managed?',
    domain: 'operations',
    options: [
      { value: 1, label: 'Manual, ad-hoc deployment' },
      { value: 2, label: 'Semi-automated deployment with minimal controls' },
      { value: 3, label: 'Defined deployment processes with manual verification' },
      { value: 4, label: 'Automated deployment with strong controls' },
      { value: 5, label: 'Fully automated, secure deployment with verification' }
    ]
  },
  {
    id: 'ops5',
    text: 'Are there operational monitoring and alerting for PKI components?',
    domain: 'operations',
    options: [
      { value: 1, label: 'No monitoring or alerting' },
      { value: 2, label: 'Basic monitoring with limited alerting' },
      { value: 3, label: 'Regular monitoring with manual review' },
      { value: 4, label: 'Comprehensive monitoring with automated alerts' },
      { value: 5, label: 'Advanced monitoring with predictive analytics and automated remediation' }
    ]
  }
];

export const resourcesQuestions: Question[] = [
  {
    id: 'res1',
    text: 'Is there dedicated PKI expertise within the organization?',
    domain: 'resources',
    options: [
      { value: 1, label: 'No dedicated PKI expertise' },
      { value: 2, label: 'Limited expertise in a few individuals' },
      { value: 3, label: 'Dedicated resources with basic PKI knowledge' },
      { value: 4, label: 'Team with strong PKI expertise' },
      { value: 5, label: 'Dedicated PKI team with specialized expertise and certifications' }
    ]
  },
  {
    id: 'res2',
    text: 'Is there a training program for PKI administrators?',
    domain: 'resources',
    options: [
      { value: 1, label: 'No training program' },
      { value: 2, label: 'Ad-hoc, informal training' },
      { value: 3, label: 'Basic training program but not comprehensive' },
      { value: 4, label: 'Comprehensive training program with regular updates' },
      { value: 5, label: 'Advanced training program with certification requirements' }
    ]
  },
  {
    id: 'res3',
    text: 'Are there adequate tools for certificate management?',
    domain: 'resources',
    options: [
      { value: 1, label: 'No dedicated certificate management tools' },
      { value: 2, label: 'Basic tools with limited functionality' },
      { value: 3, label: 'Adequate tools but not fully utilized' },
      { value: 4, label: 'Comprehensive tools that are well utilized' },
      { value: 5, label: 'Advanced tools with automation and integration' }
    ]
  },
  {
    id: 'res4',
    text: 'Is there a budget allocated specifically for PKI operations?',
    domain: 'resources',
    options: [
      { value: 1, label: 'No dedicated budget' },
      { value: 2, label: 'Minimal budget that is frequently insufficient' },
      { value: 3, label: 'Adequate but inconsistent budget' },
      { value: 4, label: 'Consistent budget aligned with needs' },
      { value: 5, label: 'Comprehensive budget with strategic investments' }
    ]
  },
  {
    id: 'res5',
    text: 'Is there executive support for PKI initiatives?',
    domain: 'resources',
    options: [
      { value: 1, label: 'No executive support or awareness' },
      { value: 2, label: 'Limited awareness but minimal support' },
      { value: 3, label: 'Awareness and basic support for critical initiatives' },
      { value: 4, label: 'Strong support for PKI initiatives' },
      { value: 5, label: 'Executive championing of PKI as a strategic asset' }
    ]
  }
];
