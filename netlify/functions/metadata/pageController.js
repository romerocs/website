const pageScraper = require('./pageScraper');

async function scrapeAll(url, browserInstance){
	let browser;
	try{
		browser = await browserInstance;
		await pageScraper.scraper(url, browser);	
		
	}
	catch(err){
		console.log("Could not resolve the browser instance => ", err);
	}
}

module.exports = (browserInstance) => scrapeAll(url, browserInstance)