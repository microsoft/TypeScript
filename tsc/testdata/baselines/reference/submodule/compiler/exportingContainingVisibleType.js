//// [tests/cases/compiler/exportingContainingVisibleType.ts] ////

//// [exportingContainingVisibleType.ts]
class Foo {
    public get foo() {
        var i: Foo;
        return i; // Should be fine (previous bug report visibility error).
 
    }
}
 
export var x = 5;


//// [exportingContainingVisibleType.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
class Foo {
    get foo() {
        var i;
        return i;
    }
}
exports.x = 5;
