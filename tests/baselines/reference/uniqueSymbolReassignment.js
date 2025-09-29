//// [tests/cases/compiler/uniqueSymbolReassignment.ts] ////

//// [uniqueSymbolFullTest.ts]
// -------------------------
// Explicit unique symbols (should emit `const` / `typeof` when exported)
// -------------------------
const mySymbol = Symbol('Symbols.mySymbol');
const anotherUnique = Symbol('symbols.anotherUnique');

function myFunction() {}

// Attach the unique ones
myFunction.mySymbol = mySymbol;
myFunction.anotherUnique = anotherUnique;

// -------------------------
// Non-unique symbols (should stay `var`)
// -------------------------
let nonUnique1 = Symbol('nonUnique1');
let nonUnique2 = Symbol('nonUnique2');

myFunction.nonUnique1 = nonUnique1;
myFunction.nonUnique2 = nonUnique2;

// -------------------------
// Normal variables (should stay `var`/string)
// -------------------------
const normalVar = "just a string";
const symbolName = "this contains symbol but is not one";

myFunction.normalVar = normalVar;
myFunction.symbolName = symbolName;

// -------------------------
// Export symbols along with function to test `typeof` behavior
// -------------------------
export { myFunction, anotherUnique };


//// [uniqueSymbolFullTest.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.anotherUnique = void 0;
exports.myFunction = myFunction;
// -------------------------
// Explicit unique symbols (should emit `const` / `typeof` when exported)
// -------------------------
var mySymbol = Symbol('Symbols.mySymbol');
var anotherUnique = Symbol('symbols.anotherUnique');
exports.anotherUnique = anotherUnique;
function myFunction() { }
// Attach the unique ones
myFunction.mySymbol = mySymbol;
myFunction.anotherUnique = anotherUnique;
// -------------------------
// Non-unique symbols (should stay `var`)
// -------------------------
var nonUnique1 = Symbol('nonUnique1');
var nonUnique2 = Symbol('nonUnique2');
myFunction.nonUnique1 = nonUnique1;
myFunction.nonUnique2 = nonUnique2;
// -------------------------
// Normal variables (should stay `var`/string)
// -------------------------
var normalVar = "just a string";
var symbolName = "this contains symbol but is not one";
myFunction.normalVar = normalVar;
myFunction.symbolName = symbolName;


//// [uniqueSymbolFullTest.d.ts]
declare const anotherUnique: unique symbol;
declare function myFunction(): void;
declare namespace myFunction {
    const mySymbol: unique symbol;
    const anotherUnique: typeof anotherUnique;
    var nonUnique1: symbol;
    var nonUnique2: symbol;
    var normalVar: string;
    var symbolName: string;
}
export { myFunction, anotherUnique };


//// [DtsFileErrors]


uniqueSymbolFullTest.d.ts(5,11): error TS2502: 'anotherUnique' is referenced directly or indirectly in its own type annotation.


==== uniqueSymbolFullTest.d.ts (1 errors) ====
    declare const anotherUnique: unique symbol;
    declare function myFunction(): void;
    declare namespace myFunction {
        const mySymbol: unique symbol;
        const anotherUnique: typeof anotherUnique;
              ~~~~~~~~~~~~~
!!! error TS2502: 'anotherUnique' is referenced directly or indirectly in its own type annotation.
        var nonUnique1: symbol;
        var nonUnique2: symbol;
        var normalVar: string;
        var symbolName: string;
    }
    export { myFunction, anotherUnique };
    