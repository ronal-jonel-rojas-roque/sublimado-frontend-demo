export const getDiscountedPrice = (price: number, discountPercentage: number): number => {
  return price - (price * (discountPercentage / 100));
};

export const calculateOriginalPrice = (price: number, discountPercentage: number): number => {
  return price / (1 - discountPercentage / 100);
};

// Formatea el precio a moneda local (Soles)
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
  }).format(amount);
};