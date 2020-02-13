const playwright = require("playwright");
const chalk = require("chalk");
const { join } = require("path");
const { readFileSync } = require("fs");

// Turning this on will leave the Chromium browser open, giving you the
// chance to open up the web inspector.
const debugging = false;

(async () => {
  for (const browserType of ["chromium", "firefox", "webkit"]) {
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
    page.on("console", log => console[log._type](log._text));

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
  }
})();
