//// [tests/cases/conformance/Symbols/ES5SymbolProperty1.ts] ////

//// [ES5SymbolProperty1.ts]
interface SymbolConstructor {
    foo: string;
}
var Symbol: SymbolConstructor;

var obj = {
    [Symbol.foo]: 0
}

obj[Symbol.foo];

/// [Declarations] ////



//// [ES5SymbolProperty1.d.ts]
interface SymbolConstructor {
    foo: string;
}
declare var Symbol: SymbolConstructor;
declare var obj: invalid;
/// [Errors] ////

ES5SymbolProperty1.ts(7,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== ES5SymbolProperty1.ts (1 errors) ====
    interface SymbolConstructor {
        foo: string;
    }
    var Symbol: SymbolConstructor;
    
    var obj = {
        [Symbol.foo]: 0
        ~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    
    obj[Symbol.foo];