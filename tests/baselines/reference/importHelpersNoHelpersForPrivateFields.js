//// [tests/cases/compiler/importHelpersNoHelpersForPrivateFields.ts] ////

//// [main.ts]
export class Foo {
    #field = true;
    f() {
        this.#field = this.#field;
        #field in this;
    }
}

//// [tslib.d.ts]
export {}


//// [main.js]
"use strict";
var _Foo_field;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
const tslib_1 = require("tslib");
class Foo {
    constructor() {
        _Foo_field.set(this, true);
    }
    f() {
        (0, tslib_1.__classPrivateFieldSet)(this, _Foo_field, (0, tslib_1.__classPrivateFieldGet)(this, _Foo_field, "f"), "f");
        (0, tslib_1.__classPrivateFieldIn)(_Foo_field, this);
    }
}
exports.Foo = Foo;
_Foo_field = new WeakMap();
