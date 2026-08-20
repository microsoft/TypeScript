//// [tests/cases/compiler/controlFlowForCatchAndFinally.ts] ////

//// [controlFlowForCatchAndFinally.ts]
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

//// [controlFlowForCatchAndFinally.js]
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function test() {
    return __awaiter(this, void 0, void 0, function* () {
        let browser = undefined;
        let page = undefined;
        try {
            browser = yield test1();
            page = yield test2(browser);
            return yield page.content();
            ;
        }
        finally {
            if (page) {
                yield page.close(); // ok
            }
            if (browser) {
                yield browser.close(); // ok
            }
        }
    });
}
;
class Foo {
    constructor() {
        this.abortController = undefined;
    }
    operation() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.abortController !== undefined) {
                this.abortController.abort();
                this.abortController = undefined;
            }
            try {
                this.abortController = new Aborter();
            }
            catch (error) {
                if (this.abortController !== undefined) {
                    this.abortController.abort(); // ok
                }
            }
        });
    }
}
