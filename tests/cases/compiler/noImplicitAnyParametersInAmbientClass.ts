//@noImplicitAny: true

declare class D_C {
    // No implicit-'any' errors.
    public pub_f1(): void;

    // Implicit-'any' errors for x.
    public pub_f2(x): void;

    // No implicit-'any' errors.
    public pub_f3(x: any): void;

    // Implicit-'any' errors for x, y, and z.
    public pub_f4(x, y, z): void;

    // Implicit-'any' errors for x, and z.
    public pub_f5(x, y: any, z): void;

    // Implicit-'any[]' errors for r.
    public pub_f6(...r): void;

    // Implicit-'any'/'any[]' errors for x, r.
    public pub_f7(x, ...r): void;

    // Implicit-'any' errors for x1, y2, x3, and y3.
    public pub_f8(x1, y1: number): any;
    public pub_f8(x2: string, y2): any;
    public pub_f8(x3, y3): any;

    // No implicit-'any' errors.
    public pub_f9: () => string;

    // Implicit-'any' error for x.
    public pub_f10: (x) => string;

    // Implicit-'any' errors for x, y, and z.
    public pub_f11: (x, y, z) => string;

    // Implicit-'any' errors for x and z.
    public pub_f12: (x, y: any, z) => string;

    // Implicit-'any[]' error for r.
    public pub_f13: (...r) => string;

    // Implicit-'any'/'any[]' errors for x, r.
    public pub_f14: (x, ...r) => string;

    ///////////////////////////////////////////

    // No implicit-'any' errors.
    private priv_f1(): void;

    // No implicit-'any' errors.
    private priv_f2(x): void;

    // No implicit-'any' errors.
    private priv_f3(x: any): void;

    // No implicit-'any' errors.
    private priv_f4(x, y, z): void;

    // No implicit-'any' errors.
    private priv_f5(x, y: any, z): void;

    // No implicit-'any' errors.
    private priv_f6(...r): void;

    // No implicit-'any' errors.
    private priv_f7(x, ...r): void;

    // No implicit-'any' errors.
    private priv_f8(x1, y1: number): any;
    private priv_f8(x2: string, y2): any;
    private priv_f8(x3, y3): any;

    // No implicit-'any' errors.
    private priv_f9: () => string;

    // Implicit-'any' error for x.
    private priv_f10: (x) => string;

    // Implicit-'any' errors for x, y, and z.
    private priv_f11: (x, y, z) => string;

    // Implicit-'any' errors for x and z.
    private priv_f12: (x, y: any, z) => string;

    // Implicit-'any[]' error for r.
    private priv_f13: (...r) => string;

    // Implicit-'any'/'any[]' errors for x, r.
    private priv_f14: (x, ...r) => string;
}