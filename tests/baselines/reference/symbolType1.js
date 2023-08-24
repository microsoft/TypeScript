//// [tests/cases/conformance/es6/Symbols/symbolType1.ts] ////

//// [symbolType1.ts]
Symbol() instanceof Symbol;
Symbol instanceof Symbol();
(Symbol() || {}) instanceof Object; // This one should be okay, it's a valid way of distinguishing types
Symbol instanceof (Symbol() || {});

//// [symbolType1.js]
Symbol() instanceof Symbol;
Symbol instanceof Symbol();
(Symbol() || {}) instanceof Object; // This one should be okay, it's a valid way of distinguishing types
Symbol instanceof (Symbol() || {});
