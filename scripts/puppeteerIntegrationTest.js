const puppeteer = require("puppeteer");
const chalk = require("chalk");
const { join } = require("path");
const { readFileSync } = require("fs");

// Turning this on will leave the Chromium browser open, giving you the
// chance to open up the web inspector.
const debugging = false;

(async () => {
    const browser = await puppeteer.launch({ headless: !debugging });
    const page = await browser.newPage();

    const errorCaught = err => {
        console.error(chalk.red("There was an error running built/typescript.js in a browser"));
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
})();
