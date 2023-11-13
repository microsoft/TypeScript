//// [tests/cases/conformance/constEnums/constEnumPropertyAccess1.ts] ////

//// [constEnumPropertyAccess1.ts]
// constant enum declarations are completely erased in the emitted JavaScript code.
// it is an error to reference a constant enum object in any other context
// than a property access that selects one of the enum's members

const enum G {
    A = 1,
    B = 2,
    C = A + B,
    D = A * 2
}

var o: {
    [idx: number]: boolean
} = {
        1: true
    };

var a: G = G.A;
var a1: G = G["A"];
var g: boolean = o[G.A];

class C {
    [G.A](): void { }
    get [G.B](): number {
        return true;
    }
    set [G.B](x: number) { }
}



/// [Declarations] ////



//// [constEnumPropertyAccess1.d.ts]
declare const enum G {
    A = 1,
    B = 2,
    C = 3,
    D = 2
}
declare var o: {
    [idx: number]: boolean;
};
declare var a: G;
declare var a1: G;
declare var g: boolean;
declare class C {
    [G.A](): void;
    get [G.B](): number;
    set [G.B](x: number);
}

/// [Errors] ////

constEnumPropertyAccess1.ts(8,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
constEnumPropertyAccess1.ts(9,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
constEnumPropertyAccess1.ts(25,9): error TS2322: Type 'boolean' is not assignable to type 'number'.


==== constEnumPropertyAccess1.ts (3 errors) ====
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
    
    var o: {
        [idx: number]: boolean
    } = {
            1: true
        };
    
    var a: G = G.A;
    var a1: G = G["A"];
    var g: boolean = o[G.A];
    
    class C {
        [G.A](): void { }
        get [G.B](): number {
            return true;
            ~~~~~~
!!! error TS2322: Type 'boolean' is not assignable to type 'number'.
        }
        set [G.B](x: number) { }
    }
    
    