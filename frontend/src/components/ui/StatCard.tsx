import React from 'react';
import './StatCard.css';

interface StatCardProps {
  label: string;
  value: string | number;
  variant?: 'primary' | 'success' | 'warning' | 'danger';
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, variant = 'primary' }) => {
  return (
    <div className={`stat-card stat-card-${variant}`}>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
};
