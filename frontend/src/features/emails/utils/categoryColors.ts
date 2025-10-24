export const getCategoryColor = (category: string) => {
  const colors = {
    important: 'text-green-600',
    promotions: 'text-purple-600',
    social: 'text-blue-600',
    marketing: 'text-orange-600',
    spam: 'text-red-600',
    general: 'text-gray-600',
  };
  return colors[category.toLowerCase() as keyof typeof colors] || 'text-gray-600';
};
