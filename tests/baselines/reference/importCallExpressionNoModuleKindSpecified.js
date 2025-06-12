//// [tests/cases/conformance/dynamicImport/importCallExpressionNoModuleKindSpecified.ts] ////

//// [0.ts]
export class B {
    print() { return "I am B"}
}

export function foo() { return "foo" }

//// [1.ts]
export function backup() { return "backup"; }

//// [2.ts]
declare var console: any;
class C {
    private myModule = import("./0");
    method() {
        const loadAsync = import("./0");
        this.myModule.then(Zero => {
            console.log(Zero.foo());
        }, async err => {
            console.log(err);
            let one = await import("./1");
            console.log(one.backup());
        });
    }
}

//// [0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.B = void 0;
exports.foo = foo;
class B {
    print() { return "I am B"; }
}
exports.B = B;
function foo() { return "foo"; }
//// [1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.backup = backup;
function backup() { return "backup"; }
//// [2.js]
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class C {
    constructor() {
        this.myModule = Promise.resolve().then(function () { return require("./0"); });
    }
    method() {
        const loadAsync = Promise.resolve().then(function () { return require("./0"); });
        this.myModule.then(Zero => {
            console.log(Zero.foo());
        }, (err) => __awaiter(this, void 0, void 0, function* () {
            console.log(err);
            let one = yield Promise.resolve().then(function () { return require("./1"); });
            console.log(one.backup());
        }));
    }
}
