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
var C = /** @class */ (function () {
    function C() {
        // No implicit-'any' errors.
        this.pub_f9 = function () { return ""; };
        // Implicit-'any' errors for x.
        this.pub_f10 = function (x) { return ""; };
        // Implicit-'any' errors for x, y, and z.
        this.pub_f11 = function (x, y, z) { return ""; };
        // Implicit-'any' errors for x and z.
        this.pub_f12 = function (x, y, z) { return ""; };
        // Implicit-'any[]' error for r.
        this.pub_f13 = function () {
            var r = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                r[_i] = arguments[_i];
            }
            return "";
        };
        // Implicit-'any'/'any[]' errors for x, r.
        this.pub_f14 = function (x) {
            var r = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                r[_i - 1] = arguments[_i];
            }
            return "";
        };
        // No implicit-'any' errors.
        this.priv_f9 = function () { return ""; };
        // Implicit-'any' errors for x.
        this.priv_f10 = function (x) { return ""; };
        // Implicit-'any' errors for x, y, and z.
        this.priv_f11 = function (x, y, z) { return ""; };
        // Implicit-'any' errors for x and z.
        this.priv_f12 = function (x, y, z) { return ""; };
        // Implicit-'any[]' error for r.
        this.priv_f13 = function () {
            var r = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                r[_i] = arguments[_i];
            }
            return "";
        };
        // Implicit-'any'/'any[]' errors for x, r.
        this.priv_f14 = function (x) {
            var r = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                r[_i - 1] = arguments[_i];
            }
            return "";
        };
    }
    // No implicit-'any' errors.
    C.prototype.pub_f1 = function () { };
    // Implicit-'any' errors for x.
    C.prototype.pub_f2 = function (x) { };
    // No implicit-'any' errors.
    C.prototype.pub_f3 = function (x) { };
    // Implicit-'any' errors for x, y, and z.
    C.prototype.pub_f4 = function (x, y, z) { };
    // Implicit-'any' errors for x, and z.
    C.prototype.pub_f5 = function (x, y, z) { };
    // Implicit-'any[]' errors for r.
    C.prototype.pub_f6 = function () {
        var r = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            r[_i] = arguments[_i];
        }
    };
    // Implicit-'any'/'any[]' errors for x, r.
    C.prototype.pub_f7 = function (x) {
        var r = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            r[_i - 1] = arguments[_i];
        }
    };
    C.prototype.pub_f8 = function (x3, y3) { };
    ///////////////////////////////////////////
    // No implicit-'any' errors.
    C.prototype.priv_f1 = function () { };
    // Implicit-'any' errors for x.
    C.prototype.priv_f2 = function (x) { };
    // No implicit-'any' errors.
    C.prototype.priv_f3 = function (x) { };
    // Implicit-'any' errors for x, y, and z.
    C.prototype.priv_f4 = function (x, y, z) { };
    // Implicit-'any' errors for x, and z.
    C.prototype.priv_f5 = function (x, y, z) { };
    // Implicit-'any[]' errors for r.
    C.prototype.priv_f6 = function () {
        var r = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            r[_i] = arguments[_i];
        }
    };
    // Implicit-'any'/'any[]' errors for x, r.
    C.prototype.priv_f7 = function (x) {
        var r = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            r[_i - 1] = arguments[_i];
        }
    };
    C.prototype.priv_f8 = function (x3, y3) { };
    return C;
}());
