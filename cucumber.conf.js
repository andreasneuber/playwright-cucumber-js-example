const {Before, BeforeAll, AfterAll, After, setDefaultTimeout} = require("@cucumber/cucumber");
// you can choose other browsers like webkit or firefox according to your requirement
const {chromium} = require("playwright");
// in milliseconds
setDefaultTimeout(60000);


Object.assign(global, {
    BASE_URL: 'http://localhost:8000/index.php'
});

// launch the browser
BeforeAll(async function () {
    //good for local test development
    global.browser = await chromium.launch({
        headless: false,
        slowMo: 1000,
    });

    //for running tests in CI
    // global.browser = await chromium.launch({
    //     headless: true,
    //     slowMo: 1,
    // });
});

// close the browser
AfterAll(async function () {
    await global.browser.close();
});

// Create a new browser context and page per scenario
Before(async function () {
    global.context = await global.browser.newContext();
    global.page = await global.context.newPage();
});

// Cleanup after each scenario
After(async function () {
    await global.page.close();
    await global.context.close();
});
