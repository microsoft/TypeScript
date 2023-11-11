//// [tests/cases/compiler/wellKnownSymbolExpando.ts] ////

//// [wellKnownSymbolExpando.ts]
function f(): void {}
f[Symbol.iterator] = function() {}


/// [Declarations] ////



//// [/.src/wellKnownSymbolExpando.d.ts]
declare function f(): void;
declare namespace f { }
