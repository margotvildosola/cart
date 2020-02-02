export type CartDataItem = {
  "product-type": string;
  options: { [index: string]: string };
  "artist-markup": number;
  quantity: number;
};

export type CartData = CartDataItem[];

type BasePriceItem = {
  "product-type": string;
  "base-price": number;
  options: { [index: string]: string[] };
};

export type BasePricesData = BasePriceItem[];

export const findBasePrice = (
  cartItem: CartDataItem,
  basePricesData: BasePricesData
): number => {
  const basePriceForProduct = basePricesData.filter(
    basePrice => cartItem["product-type"] === basePrice["product-type"]
  );
  const basePriceFound = basePriceForProduct.find(basePrice => {
    const basePriceOptions = Object.keys(basePrice.options);

    // Check if this base price matches the options of the cart item
    const optionsMatchTotal = basePriceOptions.reduce(
      (optionsMatch: number, option: string) => {
        if (basePrice.options[option].includes(cartItem.options[option])) {
          return optionsMatch + 1;
        }
        return optionsMatch;
      },
      0
    );

    return optionsMatchTotal === basePriceOptions.length;
  });
  // This is just to protect the code from crashing if we try to get a property from undefined
  if (!basePriceFound) {
    throw new Error("The base price for this product does not exist!!");
  }

  return basePriceFound["base-price"];
};

export const calculateFinalPrice = (
  basePrice: number,
  artistMarkup: number,
  quantity: number
): number =>
  (basePrice + Math.round((basePrice * artistMarkup) / 100)) * quantity;

export const getCartTotal = (
  cartData: CartData,
  basePricesData: BasePricesData
): number => {
  const total = cartData.reduce((acc, cartItem): number => {
    const basePrice = findBasePrice(cartItem, basePricesData);
    const artistMarkup = cartItem["artist-markup"];
    const quantity = cartItem.quantity;

    return acc + calculateFinalPrice(basePrice, artistMarkup, quantity);
  }, 0);

  return total;
};
