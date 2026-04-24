export const formatNumber = (num) => {
  return new Intl.NumberFormat().format(num);
};

export const formatPercentage = (num) => {
  return `${(num * 100).toFixed(1)}%`;
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};
