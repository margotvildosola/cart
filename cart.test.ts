import { findBasePrice, calculateFinalPrice, getCartTotal } from "./cart";
import { expect } from "chai";
import cart4560 from "./data/cart-4560.json";
import cart9363 from "./data/cart-9363.json";
import cart9500 from "./data/cart-9500.json";
import cart11356 from "./data/cart-11356.json";
import cart7300 from "./data/cart-7300.json";
import basePrices from "./data/base-prices.json";

describe("Unit tests", () => {
  describe("findBasePrice()", () => {
    it("should return the matching base price", () => {
      const cartItem = {
        "product-type": "hoodie",
        options: {
          size: "small",
          colour: "white",
          "print-location": "front"
        },
        "artist-markup": 20,
        quantity: 1
      };
      expect(findBasePrice(cartItem, basePrices)).to.equal(3800);
    });
    it("should throw an error if a product does not exist", () => {
      const cartItem = {
        "product-type": "hoodieeeeee",
        options: {
          size: "small",
          colour: "white",
          "print-location": "front"
        },
        "artist-markup": 20,
        quantity: 1
      };
      expect(() => findBasePrice(cartItem, basePrices)).to.throw(Error);
    });
    it("should throw an error if a cart item does match any options in the base prices", () => {
      const cartItem = {
        "product-type": "hoodie",
        options: {
          size: "xxxxxl",
          colour: "white",
          "print-location": "front"
        },
        "artist-markup": 20,
        quantity: 1
      };
      expect(() => findBasePrice(cartItem, basePrices)).to.throw(Error);
    });
  });
  describe("calculateFinalPrice()", () => {
    it("should return 4560 considering the artist's markup", () => {
      expect(calculateFinalPrice(3800, 20, 1)).to.equal(4560);
    });
    it("should return 9120 considering the artist's markup", () => {
      expect(calculateFinalPrice(3800, 20, 2)).to.equal(9120);
    });
  });
});

describe("Integration tests", () => {
  describe("cart4560", () => {
    it("should return 4560 cents", () => {
      expect(getCartTotal(cart4560, basePrices)).to.equal(4560);
    });
  });
  describe("cart9363", () => {
    it("should return 9363 cents", () => {
      expect(getCartTotal(cart9363, basePrices)).to.equal(9363);
    });
  });

  describe("cart9500", () => {
    it("should return 9500 cents", () => {
      expect(getCartTotal(cart9500, basePrices)).to.equal(9500);
    });
  });

  describe("cart11356", () => {
    it("should return 11356 cents", () => {
      expect(getCartTotal(cart11356, basePrices)).to.equal(11356);
    });
  });

  describe("cart7300", () => {
    it("should return 7300 cents", () => {
      expect(getCartTotal(cart7300, basePrices)).to.equal(7300);
    });
  });
});
