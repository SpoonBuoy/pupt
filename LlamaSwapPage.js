const puppeteer = require('puppeteer-core');
//selectors is a hashmap of  string-sting 
//contains all the required query selectors needed
//all the methods that expect selector fills the selector
//by itself if selector string provided by the called is empty
const selectors = require('./selectors');
//LlamaSwapPage class is an abstracted layer of the mentioned webpage
//for the puppeteer-core lib
class LlamaSwapPage {
  //constructor
  constructor() {
    this.page = null; // Placeholder for the puppeteer.Page object
  }
 
  //setup method starts a browser, and opens a new tab
  //the executable path to the browser is required for this method
  async setup(chrome) {
    //console.log(chrome);
    console.log("Setting Up...")
    const browser = await puppeteer.launch({
                        executablePath : chrome,
                        headless : false
                    });
    this.page = await browser.newPage();
  }

  //navigateTo is self explainatory, requires a url string
  async navigateTo(url) {
    await this.page.goto(url);
  }

  //selectFromDropdown selects the required element from the 
  //dropdown menu, requires a selector string to a dropdown
  //and an element index which has to be selected (elements are 1 indexed)
  async selectFromDropdown(selector, elementIndex){
    const maxElements = 10;
    elementIndex = Math.min(elementIndex, maxElements);
    if(selector.length == 0){
        selector = selectors.get("Dropdown");
    }
    const ele = await this.page.locator(selector);
    await ele.click();
    for(var i=0;i<elementIndex - 1;i++){
        await this.page.keyboard.press('ArrowDown');
    }
    await this.page.keyboard.press('Enter');
  }


  //fillTheValueFields fills the required integer in an input section 
  //requires a selector string for an input section and the value
  async fillTheValueFields(selector, value){
    if(selector.length == 0){
        selector = selectors.get("SellField");
    }
    await this.page.locator(selector).fill(`${value}`);
  }

  //setupTokenFields locates the required token sections 
  //and returns to the caller, requires the selector string
  async setupTokenFields(selector){
    if(selector.length == 0){
        selector = selectors.get("Token");
    }
    const elements = await this.page.$$(selector);
    return elements;
  }

  //selectTokens select the given token 
  //requires the token string which is the name of the token
  async selectTokens(token){
    await this.page.keyboard.type(token);
    var tokenName;
    if(token == 'WBTC'){
        tokenName = "Wrapped BTC (WBTC)";
    }else{
        tokenName = "USD Coin (Bridged) (USDC.e)";
    }
    //console.log(tokenName);
    await this.page.waitForFunction(`document.querySelector("p.css-xl3lrw").innerText == "${tokenName}"`);
    await this.page.evaluate(() => {
      const elements = [...document.querySelectorAll('p.css-xl3lrw')];
      elements[0].click();
    });
  }


  //selectRouteToSwap selects the route from the swap to section
  //requires route index to be selected, which is also 1 indexed 
  async selectRouteToSwap(routeIndex){
    const maxRoutes = 4;
    //to prevent out of bounds for elements[routeIndex]
    routeIndex = Math.min(routeIndex, maxRoutes);
    await this.page.waitForFunction('document.querySelector("div.sc-d413ea6e-0")');
    const elements = await this.page.$$('div.sc-d413ea6e-0');
    await elements[routeIndex].click();
  }

}

module.exports = LlamaSwapPage;
