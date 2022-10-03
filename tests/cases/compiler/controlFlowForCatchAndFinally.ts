// @strict: true
// @lib: es6
type Page = {close(): Promise<void>; content(): Promise<string>};
type Browser = {close(): Promise<void>};
declare function test1(): Promise<Browser>;
declare function test2(obj: Browser): Promise<Page>;
async function test(): Promise<string> {
    let browser: Browser | undefined = undefined;
    let page: Page | undefined = undefined;
    try {
        browser = await test1();
        page = await test2(browser);
        return await page.content();;
    } finally {
        if (page) {
            await page.close(); // ok
        }

        if (browser) {
            await browser.close(); // ok
        }
    }
}

declare class Aborter { abort(): void };
class Foo {
    abortController: Aborter | undefined = undefined;

    async operation() {
        if (this.abortController !== undefined) {
            this.abortController.abort();
            this.abortController = undefined;
        }
        try {
            this.abortController = new Aborter();
        } catch (error) {
            if (this.abortController !== undefined) {
                this.abortController.abort(); // ok
            }
        }
    }
}