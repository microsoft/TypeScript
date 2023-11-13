//// [tests/cases/conformance/externalModules/exportAssignNonIdentifier.ts] ////

//// [foo1.ts]
var x = 10;
export = typeof x; // Ok

//// [foo2.ts]
export = "sausages"; // Ok

//// [foo3.ts]
export = class Foo3 {}; // Error, not an expression

//// [foo4.ts]
export = true; // Ok

//// [foo5.ts]
export = undefined; // Valid.  undefined is an identifier in JavaScript/TypeScript

//// [foo6.ts]
export = void; // Error, void operator requires an argument

//// [foo7.ts]
export = Date || String; // Ok

//// [foo8.ts]
export = null; // Ok



/// [Declarations] ////



//// [foo1.d.ts]
declare const _default: "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
export = _default;

//// [foo2.d.ts]
declare const _default: "sausages";
export = _default;

//// [foo3.d.ts]
declare const _default: {
    new (): {};
};
export = _default;

//// [foo4.d.ts]
declare const _default: true;
export = _default;

//// [foo5.d.ts]
export = undefined;

//// [foo6.d.ts]
declare const _default: any;
export = _default;

//// [foo7.d.ts]
declare const _default: DateConstructor | StringConstructor;
export = _default;

//// [foo8.d.ts]
declare const _default: any;
export = _default;
/// [Errors] ////

foo6.ts(1,14): error TS1109: Expression expected.


==== foo1.ts (0 errors) ====
    var x = 10;
    export = typeof x; // Ok
    
==== foo2.ts (0 errors) ====
    export = "sausages"; // Ok
    
==== foo3.ts (0 errors) ====
    export = class Foo3 {}; // Error, not an expression
    
==== foo4.ts (0 errors) ====
    export = true; // Ok
    
==== foo5.ts (0 errors) ====
    export = undefined; // Valid.  undefined is an identifier in JavaScript/TypeScript
    
==== foo6.ts (1 errors) ====
    export = void; // Error, void operator requires an argument
                 ~
!!! error TS1109: Expression expected.
    
==== foo7.ts (0 errors) ====
    export = Date || String; // Ok
    
==== foo8.ts (0 errors) ====
    export = null; // Ok
    
    