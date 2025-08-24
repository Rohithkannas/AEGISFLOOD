import React from 'react';
import { ChevronDown } from 'lucide-react';

interface DistrictSelectorProps {
  selectedDistrict: string;
  onDistrictChange: (district: string) => void;
  className?: string;
}

const biharDistricts = [
  "Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", 
  "Bhojpur", "Buxar", "Darbhanga", "East Champaran (Motihari)", "Gaya", 
  "Gopalganj", "Jamui", "Jehanabad", "Kaimur (Bhabua)", "Katihar", 
  "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", 
  "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnea", 
  "Rohtas", "Saharsa", "Samastipur", "Saran (Chhapra)", "Sheikhpura", 
  "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"
];

const DistrictSelector: React.FC<DistrictSelectorProps> = ({
  selectedDistrict,
  onDistrictChange,
  className = ''
}) => {
  return (
    <div className={`relative ${className}`}>
      <select
        value={selectedDistrict}
        onChange={(e) => onDistrictChange(e.target.value)}
        className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      >
        <option value="">Select District</option>
        {biharDistricts.map((district) => (
          <option key={district} value={district}>
            {district}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  );
};

export default DistrictSelector;
