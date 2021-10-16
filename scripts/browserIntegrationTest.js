// @ts-check
const chalk = require("chalk");
const { join } = require("path");
const { readFileSync } = require("fs");
try {
    // eslint-disable-next-line import/no-extraneous-dependencies
    require("playwright");
}
catch (error) {
    throw new Error("Playwright is expected to be installed manually before running this script");
}

// eslint-disable-next-line import/no-extraneous-dependencies
const playwright = require("playwright");

// Turning this on will leave the Chromium browser open, giving you the
// chance to open up the web inspector.
const debugging = false;

(async () => {
  for (const browserType of ["chromium", "firefox"]) {
    const browser = await playwright[browserType].launch({ headless: !debugging });
    const context = await browser.newContext();
    const page = await context.newPage();

    const errorCaught = err => {
        console.error(chalk.red("There was an error running built/typescript.js in " + browserType));
        console.log(err.toString());
        process.exitCode = 1;
    };

    page.on("error", errorCaught);
    page.on("pageerror", errorCaught);

    await page.setContent(`
    <html>
    <script>${readFileSync(join("built", "local", "typescript.js"), "utf8")}</script>
    </html>
    `);

    if (!debugging) {
        await browser.close();
    }
    else {
        console.log("Not closing the browser, you'll need to exit the process in your terminal manually");
    }
    console.log(`${browserType} :+1:`);
  }
})();

process.on("unhandledRejection", (/** @type {any}*/ err) => {
    if (err) {
        console.error(err.stack || err.message);
    }
    process.exit(1);
});

