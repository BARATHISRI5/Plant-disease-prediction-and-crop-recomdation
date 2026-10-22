import React from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';

export default function SeverityBadge({ severity }) {
  if (!severity) return null;
  
  const formattedSev = severity.toLowerCase();
  
  let bg = 'bg-gray-100';
  let text = 'text-gray-700';
  let Icon = AlertTriangle;

  if (formattedSev === 'mild') {
    bg = 'bg-green-100';
    text = 'text-green-700';
  } else if (formattedSev === 'moderate') {
    bg = 'bg-amber-100';
    text = 'text-amber-700';
  } else if (formattedSev === 'severe') {
    bg = 'bg-red-100';
    text = 'text-red-700';
  } else if (formattedSev === 'healthy') {
    bg = 'bg-emerald-100';
    text = 'text-emerald-700';
    Icon = CheckCircle;
  }

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-medium text-sm md:text-base ${bg} ${text}`}>
      <Icon size={18} />
      {severity}
    </div>
  );
}
