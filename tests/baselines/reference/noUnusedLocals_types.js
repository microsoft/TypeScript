//// [tests/cases/compiler/noUnusedLocals_types.ts] ////

//// [noUnusedLocals_types.ts]
// Test specifically for type declarations with underscore prefix

// These should all produce errors (no underscore)
type UnusedType1 = string;
interface UnusedInterface1 { x: number; }
class UnusedClass1 { }

// These should NOT produce errors (underscore prefix)
type _UnusedType2 = string;
interface _UnusedInterface2 { x: number; }  
class _UnusedClass2 { }

// Mixed usage - only the one without underscore should error
type UsedInOther = number;
type _Helper = UsedInOther; // _Helper is not an error, but it uses UsedInOther

export {};

//// [noUnusedLocals_types.js]
"use strict";
// Test specifically for type declarations with underscore prefix
Object.defineProperty(exports, "__esModule", { value: true });
var UnusedClass1 = /** @class */ (function () {
    function UnusedClass1() {
    }
    return UnusedClass1;
}());
var _UnusedClass2 = /** @class */ (function () {
    function _UnusedClass2() {
    }
    return _UnusedClass2;
}());
