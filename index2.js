const puppeteer = require('puppeteer');
const C = require('./constants');
const USERNAME_SELECTOR = '#username';
const PASSWORD_SELECTOR = '#password';
const CTA_SELECTOR = '#organic-div > form > div.login__form_action_container > button';

async function startBrowser () {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    return {
        browser,
        page
    }
}

async function closeBrowser(browser) {
    return browser.close();
}

async function playTest(url) {
    const {browser, page} = await startBrowser();

    page.setViewport({width: 1366, height: 768});

    // going to the page
    await page.goto(url);

    // filling out credentials
    await page.click(USERNAME_SELECTOR);
    await page.keyboard.type(C.username);

    await page.click(PASSWORD_SELECTOR);
    await page.keyboard.type(C.password);

    await page.click(CTA_SELECTOR);

    await page.waitForNavigation();
    //skrinsotujem stranu
    await page.screenshot({path: 'skrinsot.png'});
}

(async () => {
    await playTest("https://www.linkedin.com/login");
    process.exit(true);
})();

