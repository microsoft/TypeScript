//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsThisTypes.ts] ////

//// [index.js]
export class A {
    /** @returns {this} */
    method() {
        return this;
    }
}
export default class Base extends A {
    // This method is required to reproduce #35932
    verify() { }
}

//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = void 0;
class A {
    /** @returns {this} */
    method() {
        return this;
    }
}
exports.A = A;
class Base extends A {
    // This method is required to reproduce #35932
    verify() { }
}
exports.default = Base;


//// [index.d.ts]
export declare class A {
    /** @returns {this} */
    method(): this;
}
export default class Base extends A {
    verify(): void;
}
