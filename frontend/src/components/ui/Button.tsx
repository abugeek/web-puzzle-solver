/**
 * Reusable Button Component
 */
import React from 'react';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'success' | 'danger' | 'warning' | 'info';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  className = '',
  children,
  ...props
}) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
