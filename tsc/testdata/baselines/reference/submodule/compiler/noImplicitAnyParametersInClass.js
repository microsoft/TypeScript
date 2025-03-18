//// [tests/cases/compiler/noImplicitAnyParametersInClass.ts] ////

//// [noImplicitAnyParametersInClass.ts]
class C {
    // No implicit-'any' errors.
    public pub_f1(): void { }

    // Implicit-'any' errors for x.
    public pub_f2(x): void { }

    // No implicit-'any' errors.
    public pub_f3(x: any): void { }

    // Implicit-'any' errors for x, y, and z.
    public pub_f4(x, y, z): void { }

    // Implicit-'any' errors for x, and z.
    public pub_f5(x, y: any, z): void { }

    // Implicit-'any[]' errors for r.
    public pub_f6(...r): void { }

    // Implicit-'any'/'any[]' errors for x, r.
    public pub_f7(x, ...r): void { }

    // Implicit-'any' errors for x1, y2, x3, and y3.
    public pub_f8(x1, y1: number): any;
    public pub_f8(x2: string, y2): any;
    public pub_f8(x3, y3): any { }

    // No implicit-'any' errors.
    public pub_f9 = () => "";

    // Implicit-'any' errors for x.
    public pub_f10 = (x) => "";

    // Implicit-'any' errors for x, y, and z.
    public pub_f11 = (x, y, z) => "";

    // Implicit-'any' errors for x and z.
    public pub_f12 = (x, y: any, z) => "";

    // Implicit-'any[]' error for r.
    public pub_f13 = (...r) => "";

    // Implicit-'any'/'any[]' errors for x, r.
    public pub_f14 = (x, ...r) => "";

    ///////////////////////////////////////////

    // No implicit-'any' errors.
    private priv_f1(): void { }

    // Implicit-'any' errors for x.
    private priv_f2(x): void { }

    // No implicit-'any' errors.
    private priv_f3(x: any): void { }

    // Implicit-'any' errors for x, y, and z.
    private priv_f4(x, y, z): void { }

    // Implicit-'any' errors for x, and z.
    private priv_f5(x, y: any, z): void { }

    // Implicit-'any[]' errors for r.
    private priv_f6(...r): void { }

    // Implicit-'any'/'any[]' errors for x, r.
    private priv_f7(x, ...r): void { }

    // Implicit-'any' errors for x1, y2, x3, and y3.
    private priv_f8(x1, y1: number): any;
    private priv_f8(x2: string, y2): any;
    private priv_f8(x3, y3): any { }

    // No implicit-'any' errors.
    private priv_f9 = () => "";

    // Implicit-'any' errors for x.
    private priv_f10 = (x) => "";

    // Implicit-'any' errors for x, y, and z.
    private priv_f11 = (x, y, z) => "";

    // Implicit-'any' errors for x and z.
    private priv_f12 = (x, y: any, z) => "";

    // Implicit-'any[]' error for r.
    private priv_f13 = (...r) => "";

    // Implicit-'any'/'any[]' errors for x, r.
    private priv_f14 = (x, ...r) => "";
}

//// [noImplicitAnyParametersInClass.js]
class C {
    pub_f1() { }
    pub_f2(x) { }
    pub_f3(x) { }
    pub_f4(x, y, z) { }
    pub_f5(x, y, z) { }
    pub_f6(...r) { }
    pub_f7(x, ...r) { }
    pub_f8(x3, y3) { }
    pub_f9 = () => "";
    pub_f10 = (x) => "";
    pub_f11 = (x, y, z) => "";
    pub_f12 = (x, y, z) => "";
    pub_f13 = (...r) => "";
    pub_f14 = (x, ...r) => "";
    priv_f1() { }
    priv_f2(x) { }
    priv_f3(x) { }
    priv_f4(x, y, z) { }
    priv_f5(x, y, z) { }
    priv_f6(...r) { }
    priv_f7(x, ...r) { }
    priv_f8(x3, y3) { }
    priv_f9 = () => "";
    priv_f10 = (x) => "";
    priv_f11 = (x, y, z) => "";
    priv_f12 = (x, y, z) => "";
    priv_f13 = (...r) => "";
    priv_f14 = (x, ...r) => "";
}
