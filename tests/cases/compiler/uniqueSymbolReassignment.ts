// @filename: uniqueSymbolFullTest.ts
// @declaration: true
// @lib: esnext

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
