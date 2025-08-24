import React, { useState } from 'react';
import { Phone } from 'lucide-react';

interface MobileNumberInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

const MobileNumberInput: React.FC<MobileNumberInputProps> = ({
  value,
  onChange,
  className = '',
  placeholder = 'Enter 10-digit mobile number'
}) => {
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/\D/g, ''); // Remove non-digits
    
    if (inputValue.length <= 10) {
      onChange(inputValue);
      setError('');
    }
    
    if (inputValue.length > 0 && inputValue.length < 10) {
      setError('Invalid number - must be 10 digits');
    } else if (inputValue.length === 10) {
      setError('');
    }
  };

  const handleBlur = () => {
    if (value.length > 0 && value.length !== 10) {
      setError('Invalid number - must be 10 digits');
    }
  };

  return (
    <div className={className}>
      <div className="relative">
        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="tel"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          maxLength={10}
          className={`w-full pl-10 pr-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
            error 
              ? 'border-red-400 focus:ring-red-500 focus:border-red-500' 
              : 'border-gray-300 hover:border-blue-400 focus:ring-blue-500 focus:border-blue-500'
          } focus:outline-none focus:ring-2`}
        />
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-600 font-medium">{error}</p>
      )}
    </div>
  );
};

export default MobileNumberInput;
