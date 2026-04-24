import React from 'react';

const ChartCard = ({ title, children, subtitle }) => {
  return (
    <div className="glass-card p-6 flex flex-col h-full">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {subtitle && <p className="text-sm text-slate-400 mt-1">{subtitle}</p>}
      </div>
      <div className="flex-1 min-h-[300px]">
        {children}
      </div>
    </div>
  );
};

export default ChartCard;
