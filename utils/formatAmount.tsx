export const formatAmount = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };