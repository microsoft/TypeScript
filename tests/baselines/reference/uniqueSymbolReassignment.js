//// [tests/cases/compiler/uniqueSymbolReassignment.ts] ////

//// [uniqueSymbolReassignment.ts]
// This is a unique symbol (const + Symbol())
const mySymbol = Symbol('Symbols.mySymbol');
const Symbols = {
    mySymbol
} as const;

const anotherUnique = Symbol('symbols.anotherUnique');
const Symbols2 = {
    anotherUnique
} as const;

function myFunction() {}

// Attach the unique ones
myFunction.mySymbol = Symbols.mySymbol;
myFunction.anotherUnique = Symbols2.anotherUnique;

// Non-unique symbols (regular Symbol() without const)
let nonUniqueSymbol1 = Symbol('nonUnique1');
let nonUniqueSymbol2 = Symbol('nonUnique2');

// Plain text variables (not symbols at all)
const normalVar = "not a symbol";
const symbolName = "this contains symbol but is not one";

// Attach those as well
myFunction.nonUnique1 = nonUniqueSymbol1;
myFunction.nonUnique2 = nonUniqueSymbol2;
myFunction.normalVar = normalVar;
myFunction.symbolName = symbolName;

export { myFunction };

//// [uniqueSymbolReassignment.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myFunction = myFunction;
// This is a unique symbol (const + Symbol())
var mySymbol = Symbol('Symbols.mySymbol');
var Symbols = {
    mySymbol: mySymbol
};
var anotherUnique = Symbol('symbols.anotherUnique');
var Symbols2 = {
    anotherUnique: anotherUnique
};
function myFunction() { }
// Attach the unique ones
myFunction.mySymbol = Symbols.mySymbol;
myFunction.anotherUnique = Symbols2.anotherUnique;
// Non-unique symbols (regular Symbol() without const)
var nonUniqueSymbol1 = Symbol('nonUnique1');
var nonUniqueSymbol2 = Symbol('nonUnique2');
// Plain text variables (not symbols at all)
var normalVar = "not a symbol";
var symbolName = "this contains symbol but is not one";
// Attach those as well
myFunction.nonUnique1 = nonUniqueSymbol1;
myFunction.nonUnique2 = nonUniqueSymbol2;
myFunction.normalVar = normalVar;
myFunction.symbolName = symbolName;


//// [uniqueSymbolReassignment.d.ts]
declare function myFunction(): void;
declare namespace myFunction {
    const mySymbol: unique symbol;
    const anotherUnique: unique symbol;
    var nonUnique1: symbol;
    var nonUnique2: symbol;
    var normalVar: string;
    var symbolName: string;
}
export { myFunction };
