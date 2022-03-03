//// [complicatedPrivacy.ts]
module m1 {
    export module m2 {


        export function f1(c1: C1) {
        }
        export function f2(c2: C2) {
        }

        export class C2 implements m3.i3 {
            public get p1(arg) {
                return new C1();
            }

            public set p1(arg1: C1) {
            }

            public f55() {
                return "Hello world";
            }
        }
    }

    export function f2(arg1: { x?: C1, y: number }) {
    }

    export function f3(): {
        (a: number) : C1;
    } {
        return null;
    }

    export function f4(arg1: 
    {
    [number]: C1; // Used to be indexer, now it is a computed property
    }) {
    }


    export function f5(arg2: {
        new (arg1: C1) : C1
    }) {
    }
    module m3 {
        function f2(f1: C1) {
        }

        export interface i3 {
            f55(): string;
        }
    }

    class C1 {
    }

    interface i {
        x: number;
    }

    export class C5 implements i {
        public x: number;
    }

    export var v2: C1[];
}

class C2 {
}

module m2 {
    export module m3 {

        export class c_pr  implements mglo5.i5, mglo5.i6 {
            f1() {
                return "Hello";
            }
        }
        
        module m4 {
            class C {
            }
            module m5 {
                
                export module m6 {
                    function f1() {
                        return new C();
                    }
                }
            }
        }

    }
}

module mglo5 {
    export interface i5 {
        f1(): string;
    }

    interface i6 {
        f6(): number;
    }
}


//// [complicatedPrivacy.js]
var m1;
(function (m1) {
    var m2;
    (function (m2) {
        function f1(c1) {
        }
        m2.f1 = f1;
        function f2(c2) {
        }
        m2.f2 = f2;
        var C2 = /** @class */ (function () {
            function C2() {
            }
            Object.defineProperty(C2.prototype, "p1", {
                get: function (arg) {
                    return new C1();
                },
                set: function (arg1) {
                },
                enumerable: false,
                configurable: true
            });
            C2.prototype.f55 = function () {
                return "Hello world";
            };
            return C2;
        }());
        m2.C2 = C2;
    })(m2 = m1.m2 || (m1.m2 = {}));
    function f2(arg1) {
    }
    m1.f2 = f2;
    function f3() {
        return null;
    }
    m1.f3 = f3;
    function f4(arg1) {
    }
    m1.f4 = f4;
    function f5(arg2) {
    }
    m1.f5 = f5;
    var m3;
    (function (m3) {
        function f2(f1) {
        }
    })(m3 || (m3 = {}));
    var C1 = /** @class */ (function () {
        function C1() {
        }
        return C1;
    }());
    var C5 = /** @class */ (function () {
        function C5() {
        }
        return C5;
    }());
    m1.C5 = C5;
})(m1 || (m1 = {}));
var C2 = /** @class */ (function () {
    function C2() {
    }
    return C2;
}());
var m2;
(function (m2) {
    var m3;
    (function (m3) {
        var c_pr = /** @class */ (function () {
            function c_pr() {
            }
            c_pr.prototype.f1 = function () {
                return "Hello";
            };
            return c_pr;
        }());
        m3.c_pr = c_pr;
        var m4;
        (function (m4) {
            var C = /** @class */ (function () {
                function C() {
                }
                return C;
            }());
            var m5;
            (function (m5) {
                var m6;
                (function (m6) {
                    function f1() {
                        return new C();
                    }
                })(m6 = m5.m6 || (m5.m6 = {}));
            })(m5 || (m5 = {}));
        })(m4 || (m4 = {}));
    })(m3 = m2.m3 || (m2.m3 = {}));
})(m2 || (m2 = {}));
