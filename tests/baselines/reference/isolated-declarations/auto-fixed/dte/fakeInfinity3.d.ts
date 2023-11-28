//// [tests/cases/compiler/fakeInfinity3.ts] ////

//// [fakeInfinity3.ts]
export enum Foo {
    A = 1e999,
    B = -1e999,
}

namespace X {
    type A = 1e999;
    type B = 2e999;

    export function f(): A {
        throw new Error()
    }
}

export const m: Infinity = X.f();

export const Infinity = "oops";


/// [Declarations] ////



//// [fakeInfinity3.d.ts]
export declare enum Foo {
    A = Infinity,
    B = -Infinity
}
export declare const m: Infinity;
export declare const Infinity = "oops";
//# sourceMappingURL=fakeInfinity3.d.ts.map
/// [Errors] ////

fakeInfinity3.ts(15,17): error TS2749: 'Infinity' refers to a value, but is being used as a type here. Did you mean 'typeof Infinity'?
fakeInfinity3.ts(15,17): error TS4025: Exported variable 'm' has or is using private name 'Infinity'.


==== fakeInfinity3.ts (2 errors) ====
    export enum Foo {
        A = 1e999,
        B = -1e999,
    }
    
    namespace X {
        type A = 1e999;
        type B = 2e999;
    
        export function f(): A {
            throw new Error()
        }
    }
    
    export const m: Infinity = X.f();
                    ~~~~~~~~
!!! error TS2749: 'Infinity' refers to a value, but is being used as a type here. Did you mean 'typeof Infinity'?
                    ~~~~~~~~
!!! error TS4025: Exported variable 'm' has or is using private name 'Infinity'.
    
    export const Infinity = "oops";
    