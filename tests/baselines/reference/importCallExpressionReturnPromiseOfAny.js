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
Object.defineProperty(exports, "__esModule", { value: true });
Promise.resolve(`${`${directory}\\${moduleFile}`}`).then(s => require(s));
Promise.resolve(`${getSpecifier()}`).then(s => require(s));
var p1 = Promise.resolve(`${ValidSomeCondition() ? "./0" : "externalModule"}`).then(s => require(s));
var p1 = Promise.resolve(`${getSpecifier()}`).then(s => require(s));
var p11 = Promise.resolve(`${getSpecifier()}`).then(s => require(s));
const p2 = Promise.resolve(`${whatToLoad ? getSpecifier() : "defaulPath"}`).then(s => require(s));
p1.then(zero => {
    return zero.foo(); // ok, zero is any
});
let j;
var p3 = Promise.resolve(`${j = getSpecifier()}`).then(s => require(s));
function* loadModule(directories) {
    for (const directory of directories) {
        const path = `${directory}\\moduleFile`;
        Promise.resolve(`${yield path}`).then(s => require(s));
    }
}
