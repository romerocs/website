const scraperObject = {
  async scraper(url, browser) {
    let page = await browser.newPage();
    console.log(`Navigating to ${url}...`);
    // Navigate to the selected page
    await page.goto(this.url);
    // Wait for the required DOM to be rendered
    await page.waitForSelector('body');
    // Get the link to all the required books
    let title = await page.title();

    let metaImageUrls = await page.$$eval('meta[property="og:image"]', images => {
			// Extract the links from the data
			urls = images.map(el => el.getAttribute('content'));

			return urls;
		});

    return JSON.stringify({
      'title' : title
    });
  }
};

module.exports = scraperObject;

/* 
  title <title>
  meta description description
  meta image og:image

  Optional:
    - price og:price:amount
*/