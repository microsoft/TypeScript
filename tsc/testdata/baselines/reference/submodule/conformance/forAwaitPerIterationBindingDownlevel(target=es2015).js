//// [tests/cases/conformance/statements/for-await-ofStatements/forAwaitPerIterationBindingDownlevel.ts] ////

//// [forAwaitPerIterationBindingDownlevel.ts]
const sleep = (tm: number) => new Promise(resolve => setTimeout(resolve, tm));

async function* gen() {
    yield 1;
    await sleep(1000);
    yield 2;
}

const log = console.log;

(async () => {
    for await (const outer of gen()) {
        log(`I'm loop ${outer}`);
        (async () => {
            const inner = outer;
            await sleep(2000);
            if (inner === outer) {
                log(`I'm loop ${inner} and I know I'm loop ${outer}`);
            } else {
                log(`I'm loop ${inner}, but I think I'm loop ${outer}`);
            }
        })();
    }
})();

//// [forAwaitPerIterationBindingDownlevel.js]
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
const sleep = (tm) => new Promise(resolve => setTimeout(resolve, tm));
function* gen() {
    return __awaiter(this, void 0, void 0, function* () {
        yield 1;
        yield sleep(1000);
        yield 2;
    });
}
const log = console.log;
(() => __awaiter(void 0, void 0, void 0, function* () {
    for await (const outer of gen()) {
        log(`I'm loop ${outer}`);
        (() => __awaiter(void 0, void 0, void 0, function* () {
            const inner = outer;
            yield sleep(2000);
            if (inner === outer) {
                log(`I'm loop ${inner} and I know I'm loop ${outer}`);
            }
            else {
                log(`I'm loop ${inner}, but I think I'm loop ${outer}`);
            }
        }))();
    }
}))();
