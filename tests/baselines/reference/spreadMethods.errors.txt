tests/cases/conformance/types/spread/spreadMethods.ts(7,4): error TS2339: Property 'm' does not exist on type '{ p: number; }'.
tests/cases/conformance/types/spread/spreadMethods.ts(9,5): error TS2339: Property 'm' does not exist on type '{ p: number; }'.


==== tests/cases/conformance/types/spread/spreadMethods.ts (2 errors) ====
    class K { p = 12; m() { } }
    interface I { p: number, m(): void }
    let k = new K()
    let sk = { ...k };
    let ssk = { ...k, ...k };
    sk.p;
    sk.m(); // error
       ~
!!! error TS2339: Property 'm' does not exist on type '{ p: number; }'.
    ssk.p;
    ssk.m(); // error
        ~
!!! error TS2339: Property 'm' does not exist on type '{ p: number; }'.
    let i: I = { p: 12, m() { } };
    let si = { ...i };
    let ssi = { ...i, ...i };
    si.p;
    si.m(); // ok
    ssi.p;
    ssi.m(); // ok
    let o = { p: 12, m() { } };
    let so = { ...o };
    let sso = { ...o, ...o };
    so.p;
    so.m(); // ok
    sso.p;
    sso.m(); // ok
    