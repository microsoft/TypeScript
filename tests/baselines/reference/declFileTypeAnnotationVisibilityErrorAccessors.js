//// [tests/cases/compiler/declFileTypeAnnotationVisibilityErrorAccessors.ts] ////

//// [declFileTypeAnnotationVisibilityErrorAccessors.ts]
module m {
    class private1 {
    }

    export class public1 {
    }

    module m2 {
        export class public2 {
        }
    }

    export class c {
        // getter with annotation
        get foo1(): private1 {
            return;
        }

        // getter without annotation
        get foo2() {
            return new private1();
        }

        // setter with annotation
        set foo3(param: private1) {
        }

        // Both - getter without annotation, setter with annotation
        get foo4() {
            return new private1();
        }
        set foo4(param: private1) {
        }

        // Both - with annotation
        get foo5(): private1 {
            return;
        }
        set foo5(param: private1) {
        }

        // getter with annotation
        get foo11(): public1 {
            return;
        }

        // getter without annotation
        get foo12() {
            return new public1();
        }

        // setter with annotation
        set foo13(param: public1) {
        }

        // Both - getter without annotation, setter with annotation
        get foo14() {
            return new public1();
        }
        set foo14(param: public1) {
        }

        // Both - with annotation
        get foo15(): public1 {
            return;
        }
        set foo15(param: public1) {
        }

        // getter with annotation
        get foo111(): m2.public2 {
            return;
        }

        // getter without annotation
        get foo112() {
            return new m2.public2();
        }

        // setter with annotation
        set foo113(param: m2.public2) {
        }

        // Both - getter without annotation, setter with annotation
        get foo114() {
            return new m2.public2();
        }
        set foo114(param: m2.public2) {
        }

        // Both - with annotation
        get foo115(): m2.public2 {
            return;
        }
        set foo115(param: m2.public2) {
        }
    }
}


//// [declFileTypeAnnotationVisibilityErrorAccessors.js]
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
    var m2;
    (function (m2) {
        var public2 = /** @class */ (function () {
            function public2() {
            }
            return public2;
        }());
        m2.public2 = public2;
    })(m2 || (m2 = {}));
    var c = /** @class */ (function () {
        function c() {
        }
        Object.defineProperty(c.prototype, "foo1", {
            // getter with annotation
            get: function () {
                return;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(c.prototype, "foo2", {
            // getter without annotation
            get: function () {
                return new private1();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(c.prototype, "foo3", {
            // setter with annotation
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(c.prototype, "foo4", {
            // Both - getter without annotation, setter with annotation
            get: function () {
                return new private1();
            },
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(c.prototype, "foo5", {
            // Both - with annotation
            get: function () {
                return;
            },
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(c.prototype, "foo11", {
            // getter with annotation
            get: function () {
                return;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(c.prototype, "foo12", {
            // getter without annotation
            get: function () {
                return new public1();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(c.prototype, "foo13", {
            // setter with annotation
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(c.prototype, "foo14", {
            // Both - getter without annotation, setter with annotation
            get: function () {
                return new public1();
            },
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(c.prototype, "foo15", {
            // Both - with annotation
            get: function () {
                return;
            },
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(c.prototype, "foo111", {
            // getter with annotation
            get: function () {
                return;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(c.prototype, "foo112", {
            // getter without annotation
            get: function () {
                return new m2.public2();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(c.prototype, "foo113", {
            // setter with annotation
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(c.prototype, "foo114", {
            // Both - getter without annotation, setter with annotation
            get: function () {
                return new m2.public2();
            },
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(c.prototype, "foo115", {
            // Both - with annotation
            get: function () {
                return;
            },
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        return c;
    }());
    m.c = c;
})(m || (m = {}));


//// [declFileTypeAnnotationVisibilityErrorAccessors.d.ts]
declare namespace m {
    class private1 {
    }
    export class public1 {
    }
    namespace m2 {
        class public2 {
        }
    }
    export class c {
        get foo1(): private1;
        get foo2(): private1;
        set foo3(param: private1);
        get foo4(): private1;
        set foo4(param: private1);
        get foo5(): private1;
        set foo5(param: private1);
        get foo11(): public1;
        get foo12(): public1;
        set foo13(param: public1);
        get foo14(): public1;
        set foo14(param: public1);
        get foo15(): public1;
        set foo15(param: public1);
        get foo111(): m2.public2;
        get foo112(): m2.public2;
        set foo113(param: m2.public2);
        get foo114(): m2.public2;
        set foo114(param: m2.public2);
        get foo115(): m2.public2;
        set foo115(param: m2.public2);
    }
    export {};
}
