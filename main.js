const Page = require('./LlamaSwapPage.js');
const getChromePath = require('./chromePath.js');
const readlineSync = require('readline-sync');

//read LlamaSwapPage comments to understand the LlamaSwapPage Class
//and its related methods

async function main(path) {
  //Create a new instance of LlamaSwapPage and store it in p
  //all the methods will be called on the object p
  const p = new Page();

  //sets up a page 
  await p.setup(path);

  //navigation to our url
  await p.navigateTo('https://swap.defillama.com/?');

  //chain field dropdown selection for Arbitrum One
  await p.selectFromDropdown('', 5);

  //fill the You Sell Field value
  await p.fillTheValueFields('', 123);
  
  //Get all the token locators, here we have 2 tokens 
  //and store those in ele variable 
  const ele = await p.setupTokenFields('');

  //click on the first token locator(you sell section)
  await ele[0].click();

  //slect the token WBTC in you sell section
  await p.selectTokens('WBTC');

  //click on the second token locator(you buy section)
  await ele[1].click();

  //select the toke USDC in you buy section
  await p.selectTokens('USD C');

  //select the second route in swap section
  await p.selectRouteToSwap(2);
}



getChromePath((err, chromePath) => {
  if (err) {
    console.error(err);
    return;
  }

  //if chromePath was not somehow evalulated by the script
  //the variable will be empty and has to be filled manually
  //by the user at run time
  if (chromePath.length === 0) {
    chromePath = readlineSync.question("Failed to fetch Chrome path. Enter the path manually: ");
  }

  main(chromePath);
});


