//// [tests/cases/conformance/dynamicImport/importCallExpressionReturnPromiseOfAny.ts] ////

//// [defaultPath.ts]
export class C {}

//// [1.ts]
import * as defaultModule from "./defaultPath";
declare function getSpecifier(): string;
declare function ValidSomeCondition(): boolean;
declare var whatToLoad: boolean;
declare const directory: string;
declare const moduleFile: number;

import(`${directory}\\${moduleFile}`);
import(getSpecifier());

var p1 = import(ValidSomeCondition() ? "./0" : "externalModule");
var p1: Promise<any> = import(getSpecifier());
var p11: Promise<typeof defaultModule> = import(getSpecifier());
const p2 = import(whatToLoad ? getSpecifier() : "defaulPath") as Promise<typeof defaultModule>;
p1.then(zero => {
    return zero.foo();  // ok, zero is any
});

let j: string;
var p3: Promise<typeof defaultModule> = import(j=getSpecifier());

function * loadModule(directories: string[]) {
    for (const directory of directories) {
        const path = `${directory}\\moduleFile`;
        import(yield path);
    }
}


//// [defaultPath.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
class C {
}
exports.C = C;
//// [1.js]
"use strict";
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", { value: true });
_a = `${directory}\\${moduleFile}`, Promise.resolve().then(() => require(_a));
_b = getSpecifier(), Promise.resolve().then(() => require(_b));
var p1 = (_c = ValidSomeCondition() ? "./0" : "externalModule", Promise.resolve().then(() => require(_c)));
var p1 = (_d = getSpecifier(), Promise.resolve().then(() => require(_d)));
var p11 = (_e = getSpecifier(), Promise.resolve().then(() => require(_e)));
const p2 = (_f = whatToLoad ? getSpecifier() : "defaulPath", Promise.resolve().then(() => require(_f)));
p1.then(zero => {
    return zero.foo(); // ok, zero is any
});
let j;
var p3 = (_g = j = getSpecifier(), Promise.resolve().then(() => require(_g)));
function* loadModule(directories) {
    var _a;
    for (const directory of directories) {
        const path = `${directory}\\moduleFile`;
        _a = yield path, Promise.resolve().then(() => require(_a));
    }
}
