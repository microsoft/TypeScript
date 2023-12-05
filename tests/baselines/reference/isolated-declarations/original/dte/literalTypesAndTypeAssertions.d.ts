//// [tests/cases/conformance/types/literal/literalTypesAndTypeAssertions.ts] ////

//// [literalTypesAndTypeAssertions.ts]
const obj = {
    a: "foo" as "foo",
    b: <"foo">"foo",
    c: "foo"
};

let x1 = 1 as (0 | 1);
let x2 = 1;

let { a = "foo" } = { a: "foo" };
let { b = "foo" as "foo" } = { b: "bar" };
let { c = "foo" } = { c: "bar" as "bar" };
let { d = "foo" as "foo" } = { d: "bar" as "bar" };


/// [Declarations] ////



//// [literalTypesAndTypeAssertions.d.ts]
declare const obj: {
    a: "foo";
    b: "foo";
    c: string;
};
declare let x1: (0 | 1);
declare let x2: number;
declare let a: invalid;
declare let b: invalid;
declare let c: invalid;
declare let d: invalid;

/// [Errors] ////

literalTypesAndTypeAssertions.ts(10,7): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
literalTypesAndTypeAssertions.ts(11,7): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
literalTypesAndTypeAssertions.ts(12,7): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
literalTypesAndTypeAssertions.ts(13,7): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== literalTypesAndTypeAssertions.ts (4 errors) ====
    const obj = {
        a: "foo" as "foo",
        b: <"foo">"foo",
        c: "foo"
    };
    
    let x1 = 1 as (0 | 1);
    let x2 = 1;
    
    let { a = "foo" } = { a: "foo" };
          ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    let { b = "foo" as "foo" } = { b: "bar" };
          ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    let { c = "foo" } = { c: "bar" as "bar" };
          ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    let { d = "foo" as "foo" } = { d: "bar" as "bar" };
          ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    