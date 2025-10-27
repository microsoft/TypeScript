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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
Promise.resolve(`${`${directory}\\${moduleFile}`}`).then(s => __importStar(require(s)));
Promise.resolve(`${getSpecifier()}`).then(s => __importStar(require(s)));
var p1 = Promise.resolve(`${ValidSomeCondition() ? "./0" : "externalModule"}`).then(s => __importStar(require(s)));
var p1 = Promise.resolve(`${getSpecifier()}`).then(s => __importStar(require(s)));
var p11 = Promise.resolve(`${getSpecifier()}`).then(s => __importStar(require(s)));
const p2 = Promise.resolve(`${whatToLoad ? getSpecifier() : "defaulPath"}`).then(s => __importStar(require(s)));
p1.then(zero => {
    return zero.foo(); // ok, zero is any
});
let j;
var p3 = Promise.resolve(`${j = getSpecifier()}`).then(s => __importStar(require(s)));
function* loadModule(directories) {
    for (const directory of directories) {
        const path = `${directory}\\moduleFile`;
        Promise.resolve(`${yield path}`).then(s => __importStar(require(s)));
    }
}
