# RedBubble Cart - Coding Test
This project calculates the total price of a cart. It takes 2 files as arguments:
- a JSON file with the cart content
- a JSON file with the base prices for each product type

**Asumptions:**
- The options property in the base prices is always an array, even if there's only one option
- There are no repetitions in the base prices, in this case the code will use the first one it finds
- A cart item may contain options that do not affect the base price. (i.e. `print-location`)

**Product base price search strategy**
To find the base price of a cart item, the function `findBasePrice()` follows these steps:
1. Filter the base prices by `product-type`
2. Compare the options per base price to those selected in the cart item
3. Pick the first base price that includes the options in a cart item


## Getting Started
### Stack
- For development: `Node.js` and `TypeScript`
- For testing: `chai` and `mocha`
- For formatting: `eslint` and `prettier`

### Prerequisites
You will need to install [Node.js](https://nodejs.org/en/) (this project was built with v12.6.0)

If don't want to install Node.js you can also run the project in a Docker container, use this command:
```
docker run --rm -it --volume=(pwd):/code --workdir="/code" node:12.6 bash
```
### Installing
Install the dependencies

```
npm install
```
Build: This command will create a `dist` folder with the transpiled code
```
npm run build
```

### Execution
The example JSON files are located in the folder `data/`
```
npm run cart data/cart-11356.json data/base-prices.json
```
This command should output the following:
```
11356
```

## Running the tests

Unit tests and integration tests have been added.
They all run with the following command:
```
npm test
```

### Tests
I have added new options in `base-prices.json` for the product `leggings` and added a new data file `cart-7300.json` to test that the program can work with any options given.
- **Integration tests:** These tests check that given the 2 files `getCartTotal` returns the right final amount
- **Unit tests:** These tests will check that the functions that find the base price `findBasePrice()`and the one that calculates the price considering the artist's markup `calculateFinalPrice()` work correctly