//// [tests/cases/compiler/privateIdentifierPropertyAccessDestructuringAssignmentES6.ts] ////

//// [privateIdentifierPropertyAccessDestructuringAssignmentES6.ts]
class Example {
    #state = { value: 0 };

    update(source: { value: { value: number } }) {
        ({ value: this.#state } = source);
    }
}

new Example().update({ value: { value: 1 } });

export {};

//// [package.json]
{
    "name": "tslib",
    "main": "tslib.js",
    "typings": "tslib.d.ts"
}

//// [tslib.d.ts]
export declare function __classPrivateFieldGet(a: any, b: any, c: any, d: any): any;

//// [tslib.js]
module.exports.__classPrivateFieldGet = function (receiver, state, kind, f) {
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};

//// [privateIdentifierPropertyAccessDestructuringAssignmentES6.js]
"use strict";
var _Example_state;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
class Example {
    constructor() {
        _Example_state.set(this, { value: 0 });
    }
    update(source) {
        var _a;
        (_a = this, { value: ({ set value(_b) { tslib_1.__classPrivateFieldSet(_a, _Example_state, _b, "f"); } }).value } = source);
    }
}
_Example_state = new WeakMap();
new Example().update({ value: { value: 1 } });
