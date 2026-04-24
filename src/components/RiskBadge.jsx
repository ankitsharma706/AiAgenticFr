import React from 'react';

const RiskBadge = ({ level }) => {
  // Normalize level to capitalized (e.g. HIGH -> High, High -> High)
  const normalizedLevel = level 
    ? level.charAt(0).toUpperCase() + level.slice(1).toLowerCase() 
    : 'Low';

  const styles = {
    High: 'bg-red-500/20 text-red-500 border-red-500/50',
    Medium: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50',
    Low: 'bg-green-500/20 text-green-500 border-green-500/50',
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[normalizedLevel] || styles.Low}`}>
      {normalizedLevel}
    </span>
  );
};

export default RiskBadge;
