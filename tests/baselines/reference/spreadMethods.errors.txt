spreadMethods.ts(16,4): error TS2339: Property 'm' does not exist on type '{ p: number; }'.
spreadMethods.ts(17,4): error TS2339: Property 'g' does not exist on type '{ p: number; }'.
spreadMethods.ts(19,5): error TS2339: Property 'm' does not exist on type '{ p: number; }'.
spreadMethods.ts(20,5): error TS2339: Property 'g' does not exist on type '{ p: number; }'.


==== spreadMethods.ts (4 errors) ====
    class K {
        p = 12;
        m() { }
        get g() { return 0; }
    }
    interface I {
        p: number;
        m(): void;
        readonly g: number;
    }
    
    let k = new K()
    let sk = { ...k };
    let ssk = { ...k, ...k };
    sk.p;
    sk.m(); // error
       ~
!!! error TS2339: Property 'm' does not exist on type '{ p: number; }'.
    sk.g; // error
       ~
!!! error TS2339: Property 'g' does not exist on type '{ p: number; }'.
    ssk.p;
    ssk.m(); // error
        ~
!!! error TS2339: Property 'm' does not exist on type '{ p: number; }'.
    ssk.g; // error
        ~
!!! error TS2339: Property 'g' does not exist on type '{ p: number; }'.
    
    let i: I = { p: 12, m() { }, get g() { return 0; } };
    let si = { ...i };
    let ssi = { ...i, ...i };
    si.p;
    si.m(); // ok
    si.g; // ok
    ssi.p;
    ssi.m(); // ok
    ssi.g; // ok
    
    let o = { p: 12, m() { }, get g() { return 0; } };
    let so = { ...o };
    let sso = { ...o, ...o };
    so.p;
    so.m(); // ok
    so.g; // ok
    sso.p;
    sso.m(); // ok
    sso.g; // ok
    