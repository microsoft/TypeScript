//// [tests/cases/compiler/elidedJSImport2.ts] ////

//// [index.js]
import { Foo } from "./other.js";
import * as other from "./other.js";
import defaultFoo from "./other.js";

const x = new Foo();
const y = other.Foo();
const z = new defaultFoo();

//// [other.d.ts]
export interface Foo {
    bar: number;
}

export default interface Bar {
    foo: number;
}

//// [other.js]
export class Foo {
    bar = 2.4;
}

export default class Bar {
    foo = 1.2;
}


//// [index.js]
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const other_js_1 = require("./other.js");
const other = __importStar(require("./other.js"));
const other_js_2 = __importDefault(require("./other.js"));
const x = new other_js_1.Foo();
const y = other.Foo();
const z = new other_js_2.default();
//// [other.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
class Foo {
    constructor() {
        this.bar = 2.4;
    }
}
exports.Foo = Foo;
class Bar {
    constructor() {
        this.foo = 1.2;
    }
}
exports.default = Bar;
