import React from 'react';
import './Input.css';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
}

export const Textarea: React.FC<TextareaProps> = ({ label, hint, className = '', ...props }) => {
  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <textarea className={`form-control ${className}`} {...props} />
      {hint && <div className="form-hint">{hint}</div>}
    </div>
  );
};
