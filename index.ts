import { getCartTotal, CartData, BasePricesData } from "./cart";
import { parseFile } from "./utils";

(function(): void {
  const args = process.argv.slice(2);
  if (!args.length) {
    console.error("Error: This program needs 2 arguments");
    return;
  }
  const [cartPath, basePricePath] = args;
  const cartData = parseFile(cartPath) as CartData;
  const basePriceData = parseFile(basePricePath) as BasePricesData;
  const cartTotal = getCartTotal(cartData, basePriceData);

  console.log(`${cartTotal}\n`);
})();
