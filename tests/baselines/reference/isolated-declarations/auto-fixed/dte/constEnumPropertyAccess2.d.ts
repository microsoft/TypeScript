//// [tests/cases/conformance/constEnums/constEnumPropertyAccess2.ts] ////

//// [constEnumPropertyAccess2.ts]
// constant enum declarations are completely erased in the emitted JavaScript code.
// it is an error to reference a constant enum object in any other context
// than a property access that selects one of the enum's members

const enum G {
    A = 1,
    B = 2,
    C = A + B,
    D = A * 2
}

// Error from referring constant enum in any other context than a property access
var z: typeof G = G;
var z1: any = G[G.A];
var g: G;
g = "string";
function foo(x: G): void { }
G.B = 3;


/// [Declarations] ////



//// [constEnumPropertyAccess2.d.ts]
declare const enum G {
    A = 1,
    B = 2,
    C = 3,
    D = 2
}
declare var z: typeof G;
declare var z1: any;
declare var g: G;
declare function foo(x: G): void;
/// [Errors] ////

constEnumPropertyAccess2.ts(8,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
constEnumPropertyAccess2.ts(9,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
constEnumPropertyAccess2.ts(13,19): error TS2475: 'const' enums can only be used in property or index access expressions or the right hand side of an import declaration or export assignment or type query.
constEnumPropertyAccess2.ts(14,17): error TS2476: A const enum member can only be accessed using a string literal.
constEnumPropertyAccess2.ts(16,1): error TS2322: Type '"string"' is not assignable to type 'G'.
constEnumPropertyAccess2.ts(18,3): error TS2540: Cannot assign to 'B' because it is a read-only property.


==== constEnumPropertyAccess2.ts (6 errors) ====
    // constant enum declarations are completely erased in the emitted JavaScript code.
    // it is an error to reference a constant enum object in any other context
    // than a property access that selects one of the enum's members
    
    const enum G {
        A = 1,
        B = 2,
        C = A + B,
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        D = A * 2
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    
    // Error from referring constant enum in any other context than a property access
    var z: typeof G = G;
                      ~
!!! error TS2475: 'const' enums can only be used in property or index access expressions or the right hand side of an import declaration or export assignment or type query.
    var z1: any = G[G.A];
                    ~~~
!!! error TS2476: A const enum member can only be accessed using a string literal.
    var g: G;
    g = "string";
    ~
!!! error TS2322: Type '"string"' is not assignable to type 'G'.
    function foo(x: G): void { }
    G.B = 3;
      ~
!!! error TS2540: Cannot assign to 'B' because it is a read-only property.
    