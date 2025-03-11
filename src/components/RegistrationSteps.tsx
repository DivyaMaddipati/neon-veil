
import { Check } from 'lucide-react';

type RegistrationStepsProps = {
  currentStep: number;
};

const RegistrationSteps = ({ currentStep }: RegistrationStepsProps) => {
  const steps = [
    { number: 1, label: 'Personal Information' },
    { number: 2, label: 'Team Details' },
    { number: 3, label: 'Member Details & Submission' }
  ];

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="relative flex flex-col items-center">
            <div 
              className={`flex items-center justify-center w-12 h-12 rounded-full z-10 transition-all duration-300 
                ${currentStep > step.number 
                  ? 'bg-hackathon-purple text-white' 
                  : currentStep === step.number 
                    ? 'bg-hackathon-purple text-white animate-pulse-glow' 
                    : 'bg-gray-500 text-white'
                }`}
            >
              {currentStep > step.number ? (
                <Check className="w-6 h-6" />
              ) : (
                <span className="text-lg font-semibold">{step.number}</span>
              )}
            </div>
            
            {/* Connecting lines between steps */}
            {index < steps.length - 1 && (
              <div className="absolute top-6 -translate-y-1/2 w-full h-0.5" style={{ left: '50%' }}>
                <div 
                  className={`h-full ${
                    currentStep > step.number ? 'bg-hackathon-purple' : 'bg-gray-500'
                  }`}
                ></div>
              </div>
            )}
            
            <span 
              className={`mt-3 text-sm ${
                currentStep === step.number 
                  ? 'text-hackathon-purple font-medium' 
                  : 'text-gray-400'
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegistrationSteps;
