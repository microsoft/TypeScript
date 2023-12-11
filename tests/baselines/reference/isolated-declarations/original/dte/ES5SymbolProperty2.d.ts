//// [tests/cases/conformance/Symbols/ES5SymbolProperty2.ts] ////

//// [ES5SymbolProperty2.ts]
module M {
    var Symbol: any;

    export class C {
        [Symbol.iterator]() { }
    }
    (new C)[Symbol.iterator];
}

(new M.C)[Symbol.iterator];

/// [Declarations] ////



//// [ES5SymbolProperty2.d.ts]
declare namespace M {
    var Symbol: any;
    export class C {
        [Symbol.iterator](): invalid;
    }
    export {};
}

/// [Errors] ////

ES5SymbolProperty2.ts(5,9): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
ES5SymbolProperty2.ts(10,11): error TS2585: 'Symbol' only refers to a type, but is being used as a value here. Do you need to change your target library? Try changing the 'lib' compiler option to es2015 or later.


==== ES5SymbolProperty2.ts (2 errors) ====
    module M {
        var Symbol: any;
    
        export class C {
            [Symbol.iterator]() { }
            ~~~~~~~~~~~~~~~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9034 ES5SymbolProperty2.ts:5:9: Add a return type to the method
        }
        (new C)[Symbol.iterator];
    }
    
    (new M.C)[Symbol.iterator];
              ~~~~~~
!!! error TS2585: 'Symbol' only refers to a type, but is being used as a value here. Do you need to change your target library? Try changing the 'lib' compiler option to es2015 or later.