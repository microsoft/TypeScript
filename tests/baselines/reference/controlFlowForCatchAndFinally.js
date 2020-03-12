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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function test() {
    return __awaiter(this, void 0, void 0, function () {
        var browser, page;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    browser = undefined;
                    page = undefined;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, , 5, 10]);
                    return [4 /*yield*/, test1()];
                case 2:
                    browser = _a.sent();
                    return [4 /*yield*/, test2(browser)];
                case 3:
                    page = _a.sent();
                    return [4 /*yield*/, page.content()];
                case 4: return [2 /*return*/, _a.sent()];
                case 5:
                    if (!page) return [3 /*break*/, 7];
                    return [4 /*yield*/, page.close()];
                case 6:
                    _a.sent(); // ok
                    _a.label = 7;
                case 7:
                    if (!browser) return [3 /*break*/, 9];
                    return [4 /*yield*/, browser.close()];
                case 8:
                    _a.sent(); // ok
                    _a.label = 9;
                case 9: return [7 /*endfinally*/];
                case 10: return [2 /*return*/];
            }
        });
    });
}
;
var Foo = /** @class */ (function () {
    function Foo() {
        this.abortController = undefined;
    }
    Foo.prototype.operation = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
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
                return [2 /*return*/];
            });
        });
    };
    return Foo;
}());
