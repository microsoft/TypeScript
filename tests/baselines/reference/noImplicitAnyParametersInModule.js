//// [noImplicitAnyParametersInModule.ts]
module M {
    // No implicit-'any' errors.
    function m_f1(): void { }

    // Implicit-'any' error for x.
    function m_f2(x): void { }

    // No implicit-'any' errors.
    function m_f3(x: any): void { }

    // Implicit-'any' errors for x, y, and z.
    function m_f4(x, y, z): void { }

    // Implicit-'any' errors for x and z.
    function m_f5(x, y: any, z): void { }

    // Implicit-'any[]' error for r.
    function m_f6(...r): void { }

    // Implicit-'any'/'any[]' errors for x and r.
    function m_f7(x, ...r): void { }

    // Implicit-'any' errors for x1, y2, x3, and y3.
    function m_f8(x1, y1: number): any;
    function m_f8(x2: string, y2): any;
    function m_f8(x3, y3): any { }

    // No implicit-'any' errors.
    var m_f9 = () => "";

    // Implicit-'any' error for x.
    var m_f10 = (x) => "";

    // Implicit-'any' errors for x, y, and z.
    var m_f11 = (x, y, z) => "";

    // Implicit-'any' errors for x and z.
    var m_f12 = (x, y: any, z) => "";

    // Implicit-'any[]' errors for r.
    var m_f13 = (...r) => "";

    // Implicit-'any'/'any[]' errors for x and r.
    var m_f14 = (x, ...r) => "";
}

//// [noImplicitAnyParametersInModule.js]
var M;
(function (M) {
    // No implicit-'any' errors.
    function m_f1() { }
    // Implicit-'any' error for x.
    function m_f2(x) { }
    // No implicit-'any' errors.
    function m_f3(x) { }
    // Implicit-'any' errors for x, y, and z.
    function m_f4(x, y, z) { }
    // Implicit-'any' errors for x and z.
    function m_f5(x, y, z) { }
    // Implicit-'any[]' error for r.
    function m_f6() {
        var r = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            r[_i] = arguments[_i];
        }
    }
    // Implicit-'any'/'any[]' errors for x and r.
    function m_f7(x) {
        var r = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            r[_i - 1] = arguments[_i];
        }
    }
    function m_f8(x3, y3) { }
    // No implicit-'any' errors.
    var m_f9 = function () { return ""; };
    // Implicit-'any' error for x.
    var m_f10 = function (x) { return ""; };
    // Implicit-'any' errors for x, y, and z.
    var m_f11 = function (x, y, z) { return ""; };
    // Implicit-'any' errors for x and z.
    var m_f12 = function (x, y, z) { return ""; };
    // Implicit-'any[]' errors for r.
    var m_f13 = function () {
        var r = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            r[_i] = arguments[_i];
        }
        return "";
    };
    // Implicit-'any'/'any[]' errors for x and r.
    var m_f14 = function (x) {
        var r = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            r[_i - 1] = arguments[_i];
        }
        return "";
    };
})(M || (M = {}));
