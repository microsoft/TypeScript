// @filename: uniqueSymbolReassignment.ts
// @declaration: true
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
const nonUniqueSymbol1 = Symbol('nonUnique1');
const nonUniqueSymbol2 = Symbol('nonUnique2');

// Plain text variables (not symbols at all)
const normalVar = "not a symbol";
const symbolName = "this contains symbol but is not one";

// Attach those as well
myFunction.nonUnique1 = nonUniqueSymbol1;
myFunction.nonUnique2 = nonUniqueSymbol2;
myFunction.normalVar = normalVar;
myFunction.symbolName = symbolName;

export { myFunction };
