import chalk from "chalk";
import { join } from "path";
import { readFileSync } from "fs";

let playwright;
try {
    // @ts-ignore-error
    playwright = await import("playwright");
}
catch (error) {
    throw new Error("Playwright is expected to be installed manually before running this script");
}

// Turning this on will leave the Chromium browser open, giving you the
// chance to open up the web inspector.
const debugging = false;

/** @type {["chromium", "firefox"]} */
const browsers = ["chromium", "firefox"];

for (const browserType of browsers) {
    const browser = await playwright[browserType].launch({ headless: !debugging });
    const context = await browser.newContext();
    const page = await context.newPage();

    /** @type {(err: Error) => void} */
    const errorCaught = err => {
        console.error(chalk.red("There was an error running built/typescript.js in " + browserType));
        console.log(err.toString());
        process.exitCode = 1;
    };

    // @ts-ignore-error
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
