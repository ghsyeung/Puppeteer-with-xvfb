const puppeteer = require("puppeteer");

const runner = async search => {
  let data = [];

  console.log("Opening browser");
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage();
  try {
    console.log("Navigatig url");
    await page.goto("https://developers.google.com/web/");

    // Type into search box.
    console.log("Typing text");
    await page.type("#searchbox input", search);

    // Wait for suggest overlay to appear and click "show all results".
    const allResultsSelector = ".devsite-suggest-all-results";
    await page.waitForSelector(allResultsSelector);
    await page.click(allResultsSelector);

    // Wait for the results page to load and display the results.
    const resultsSelector = ".gsc-results .gsc-thumbnail-inside a.gs-title";
    await page.waitForSelector(resultsSelector);
    console.log("Getting data");
    // Extract the results from the page.
    data = await page.evaluate(resultsSelector => {
      const anchors = Array.from(document.querySelectorAll(resultsSelector));
      return anchors.map(anchor => {
        const title = anchor.textContent.split("|")[0].trim();
        return title;
      });
    }, resultsSelector);
    console.log("DOne, browser closing");
    await browser.close();
  } catch (e) {
    console.log('Error happened', e);
    await page.screenshot({ path: "error.png" });
    await page.close();
    await browser.close();
  }
  return data;
};

module.exports = runner;
