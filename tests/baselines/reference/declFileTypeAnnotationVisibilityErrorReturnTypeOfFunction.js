//// [declFileTypeAnnotationVisibilityErrorReturnTypeOfFunction.ts]
module m {
    class private1 {
    }

    export class public1 {
    }

    // Directly using names from this module
    function foo1(): private1 {
        return;
    }
    function foo2() {
        return new private1();
    }

    export function foo3(): private1 {
        return;
    }
    export function foo4() {
        return new private1();
    }

    function foo11(): public1 {
        return;
    }
    function foo12() {
        return new public1();
    }

    export function foo13(): public1 {
        return;
    }
    export function foo14() {
        return new public1();
    }

    module m2 {
        export class public2 {
        }
    }

    function foo111(): m2.public2 {
        return;
    }
    function foo112() {
        return new m2.public2();
    }

    export function foo113(): m2.public2 {
        return;
    }
    export function foo114() {
        return new m2.public2();
    }
}


//// [declFileTypeAnnotationVisibilityErrorReturnTypeOfFunction.js]
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
    function foo1() {
        return;
    }
    function foo2() {
        return new private1();
    }
    function foo3() {
        return;
    }
    m.foo3 = foo3;
    function foo4() {
        return new private1();
    }
    m.foo4 = foo4;
    function foo11() {
        return;
    }
    function foo12() {
        return new public1();
    }
    function foo13() {
        return;
    }
    m.foo13 = foo13;
    function foo14() {
        return new public1();
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
    function foo111() {
        return;
    }
    function foo112() {
        return new m2.public2();
    }
    function foo113() {
        return;
    }
    m.foo113 = foo113;
    function foo114() {
        return new m2.public2();
    }
    m.foo114 = foo114;
})(m || (m = {}));


//// [declFileTypeAnnotationVisibilityErrorReturnTypeOfFunction.d.ts]
declare module m {
    class private1 {
    }
    export class public1 {
    }
    export function foo3(): private1;
    export function foo4(): private1;
    export function foo13(): public1;
    export function foo14(): public1;
    module m2 {
        class public2 {
        }
    }
    export function foo113(): m2.public2;
    export function foo114(): m2.public2;
    export {};
}
