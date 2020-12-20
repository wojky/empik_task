export function usePriceFormatter(currency, separator) {
  return (price) => {
    return price.replace(/\.|\,| /g, separator) + ` ${currency}`;
  };
}
