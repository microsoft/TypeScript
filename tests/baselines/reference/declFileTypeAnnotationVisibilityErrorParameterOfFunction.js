//// [declFileTypeAnnotationVisibilityErrorParameterOfFunction.ts]
module m {
    class private1 {
    }

    export class public1 {
    }

    // Directly using names from this module
    function foo1(param: private1) {
    }
    function foo2(param = new private1()) {
    }

    export function foo3(param : private1) {
    }
    export function foo4(param = new private1()) {
    }

    function foo11(param: public1) {
    }
    function foo12(param = new public1()) {
    }

    export function foo13(param: public1) {
    }
    export function foo14(param = new public1()) {
    }

    module m2 {
        export class public2 {
        }
    }

    function foo111(param: m2.public2) {
    }
    function foo112(param = new m2.public2()) {
    }

    export function foo113(param: m2.public2) {
    }
    export function foo114(param = new m2.public2()) {
    }
}


//// [declFileTypeAnnotationVisibilityErrorParameterOfFunction.js]
var m;
(function (m) {
    var private1 = /** @class */ (function () {
        function private1() {
        }
        return private1;
    }());
    var public1 = /** @class */ (function () {
        function public1() {
        }
        return public1;
    }());
    m.public1 = public1;
    // Directly using names from this module
    function foo1(param) {
    }
    function foo2(param) {
        if (param === void 0) { param = new private1(); }
    }
    function foo3(param) {
    }
    m.foo3 = foo3;
    function foo4(param) {
        if (param === void 0) { param = new private1(); }
    }
    m.foo4 = foo4;
    function foo11(param) {
    }
    function foo12(param) {
        if (param === void 0) { param = new public1(); }
    }
    function foo13(param) {
    }
    m.foo13 = foo13;
    function foo14(param) {
        if (param === void 0) { param = new public1(); }
    }
    m.foo14 = foo14;
    var m2;
    (function (m2) {
        var public2 = /** @class */ (function () {
            function public2() {
            }
            return public2;
        }());
        m2.public2 = public2;
    })(m2 || (m2 = {}));
    function foo111(param) {
    }
    function foo112(param) {
        if (param === void 0) { param = new m2.public2(); }
    }
    function foo113(param) {
    }
    m.foo113 = foo113;
    function foo114(param) {
        if (param === void 0) { param = new m2.public2(); }
    }
    m.foo114 = foo114;
})(m || (m = {}));


//// [declFileTypeAnnotationVisibilityErrorParameterOfFunction.d.ts]
declare module m {
    class private1 {
    }
    export class public1 {
    }
    export function foo3(param: private1): void;
    export function foo4(param?: private1): void;
    export function foo13(param: public1): void;
    export function foo14(param?: public1): void;
    module m2 {
        class public2 {
        }
    }
    export function foo113(param: m2.public2): void;
    export function foo114(param?: m2.public2): void;
    export {};
}
