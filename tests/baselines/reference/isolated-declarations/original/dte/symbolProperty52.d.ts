//// [tests/cases/conformance/es6/Symbols/symbolProperty52.ts] ////

//// [symbolProperty52.ts]
var obj = {
    [Symbol.nonsense]: 0
};

obj = {};

obj[Symbol.nonsense];

/// [Declarations] ////



//// [/.src/symbolProperty52.d.ts]
declare var obj: {
    [Symbol.nonsense]: number;
};
/// [Errors] ////

symbolProperty52.ts(2,13): error TS2339: Property 'nonsense' does not exist on type 'SymbolConstructor'.
symbolProperty52.ts(7,12): error TS2339: Property 'nonsense' does not exist on type 'SymbolConstructor'.


==== symbolProperty52.ts (2 errors) ====
    var obj = {
        [Symbol.nonsense]: 0
                ~~~~~~~~
!!! error TS2339: Property 'nonsense' does not exist on type 'SymbolConstructor'.
    };
    
    obj = {};
    
    obj[Symbol.nonsense];
               ~~~~~~~~
!!! error TS2339: Property 'nonsense' does not exist on type 'SymbolConstructor'.