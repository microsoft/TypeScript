//// [tests/cases/compiler/commentsModules.ts] ////

//// [commentsModules.ts]
/** Module comment*/
module m1 {
    /** b's comment*/
    export var b: number;
    /** foo's comment*/
    function foo() {
        return b;
    }
    /** m2 comments*/
    export module m2 {
        /** class comment;*/
        export class c {
        };
        /** i*/
        export var i = new c();
    }
    /** exported function*/
    export function fooExport() {
        return foo();
    }

    // shouldn't appear
    export function foo2Export(/**hm*/ a: string) {
    }

    /** foo3Export
     * comment
     */
    export function foo3Export() {
    }

    /** foo4Export
     * comment
     */
    function foo4Export() {
    }
} // trailing comment module
m1.fooExport();
var myvar = new m1.m2.c();
/** module comment of m2.m3*/
module m2.m3 {
    /** Exported class comment*/
    export class c {
    }
} /* trailing dotted module comment*/
new m2.m3.c();
/** module comment of m3.m4.m5*/
module m3.m4.m5 {
    /** Exported class comment*/
    export class c {
    }
} // trailing dotted module 2
new m3.m4.m5.c();
/** module comment of m4.m5.m6*/
module m4.m5.m6 {
    export module m7 {
        /** Exported class comment*/
        export class c {
        }
    } /* trailing inner module */ /* multiple comments*/
}
new m4.m5.m6.m7.c();
/** module comment of m5.m6.m7*/
module m5.m6.m7 {
    /** module m8 comment*/
    export module m8 {
        /** Exported class comment*/
        export class c {
        }
    }
}
new m5.m6.m7.m8.c();
module m6.m7 {
    export module m8 {
        /** Exported class comment*/
        export class c {
        }
    }
}
new m6.m7.m8.c();
module m7.m8 {
    /** module m9 comment*/
    export module m9 {
        /** Exported class comment*/
        export class c {
        }

        /** class d */
        class d {
        }

        // class e
        export class e {
        }
    }
}
new m7.m8.m9.c();

//// [commentsModules.js]
/** Module comment*/
var m1;
(function (m1) {
    /** foo's comment*/
    function foo() {
        return m1.b;
    }
    /** m2 comments*/
    var m2;
    (function (m2) {
        /** class comment;*/
        var c = /** @class */ (function () {
            function c() {
            }
            return c;
        }());
        m2.c = c;
        ;
        /** i*/
        m2.i = new c();
    })(m2 = m1.m2 || (m1.m2 = {}));
    /** exported function*/
    function fooExport() {
        return foo();
    }
    m1.fooExport = fooExport;
    // shouldn't appear
    function foo2Export(/**hm*/ a) {
    }
    m1.foo2Export = foo2Export;
    /** foo3Export
     * comment
     */
    function foo3Export() {
    }
    m1.foo3Export = foo3Export;
    /** foo4Export
     * comment
     */
    function foo4Export() {
    }
})(m1 || (m1 = {})); // trailing comment module
m1.fooExport();
var myvar = new m1.m2.c();
/** module comment of m2.m3*/
var m2;
(function (m2) {
    var m3;
    (function (m3) {
        /** Exported class comment*/
        var c = /** @class */ (function () {
            function c() {
            }
            return c;
        }());
        m3.c = c;
    })(m3 = m2.m3 || (m2.m3 = {}));
})(m2 || (m2 = {})); /* trailing dotted module comment*/
new m2.m3.c();
/** module comment of m3.m4.m5*/
var m3;
(function (m3) {
    var m4;
    (function (m4) {
        var m5;
        (function (m5) {
            /** Exported class comment*/
            var c = /** @class */ (function () {
                function c() {
                }
                return c;
            }());
            m5.c = c;
        })(m5 = m4.m5 || (m4.m5 = {}));
    })(m4 = m3.m4 || (m3.m4 = {}));
})(m3 || (m3 = {})); // trailing dotted module 2
new m3.m4.m5.c();
/** module comment of m4.m5.m6*/
var m4;
(function (m4) {
    var m5;
    (function (m5) {
        var m6;
        (function (m6) {
            var m7;
            (function (m7) {
                /** Exported class comment*/
                var c = /** @class */ (function () {
                    function c() {
                    }
                    return c;
                }());
                m7.c = c;
            })(m7 = m6.m7 || (m6.m7 = {})); /* trailing inner module */ /* multiple comments*/
        })(m6 = m5.m6 || (m5.m6 = {}));
    })(m5 = m4.m5 || (m4.m5 = {}));
})(m4 || (m4 = {}));
new m4.m5.m6.m7.c();
/** module comment of m5.m6.m7*/
var m5;
(function (m5) {
    var m6;
    (function (m6) {
        var m7;
        (function (m7) {
            /** module m8 comment*/
            var m8;
            (function (m8) {
                /** Exported class comment*/
                var c = /** @class */ (function () {
                    function c() {
                    }
                    return c;
                }());
                m8.c = c;
            })(m8 = m7.m8 || (m7.m8 = {}));
        })(m7 = m6.m7 || (m6.m7 = {}));
    })(m6 = m5.m6 || (m5.m6 = {}));
})(m5 || (m5 = {}));
new m5.m6.m7.m8.c();
var m6;
(function (m6) {
    var m7;
    (function (m7) {
        var m8;
        (function (m8) {
            /** Exported class comment*/
            var c = /** @class */ (function () {
                function c() {
                }
                return c;
            }());
            m8.c = c;
        })(m8 = m7.m8 || (m7.m8 = {}));
    })(m7 = m6.m7 || (m6.m7 = {}));
})(m6 || (m6 = {}));
new m6.m7.m8.c();
var m7;
(function (m7) {
    var m8;
    (function (m8) {
        /** module m9 comment*/
        var m9;
        (function (m9) {
            /** Exported class comment*/
            var c = /** @class */ (function () {
                function c() {
                }
                return c;
            }());
            m9.c = c;
            /** class d */
            var d = /** @class */ (function () {
                function d() {
                }
                return d;
            }());
            // class e
            var e = /** @class */ (function () {
                function e() {
                }
                return e;
            }());
            m9.e = e;
        })(m9 = m8.m9 || (m8.m9 = {}));
    })(m8 = m7.m8 || (m7.m8 = {}));
})(m7 || (m7 = {}));
new m7.m8.m9.c();


//// [commentsModules.d.ts]
/** Module comment*/
declare namespace m1 {
    /** b's comment*/
    var b: number;
    /** m2 comments*/
    namespace m2 {
        /** class comment;*/
        class c {
        }
        /** i*/
        var i: c;
    }
    /** exported function*/
    function fooExport(): number;
    function foo2Export(/**hm*/ a: string): void;
    /** foo3Export
     * comment
     */
    function foo3Export(): void;
}
declare var myvar: m1.m2.c;
/** module comment of m2.m3*/
declare namespace m2.m3 {
    /** Exported class comment*/
    class c {
    }
}
/** module comment of m3.m4.m5*/
declare namespace m3.m4.m5 {
    /** Exported class comment*/
    class c {
    }
}
/** module comment of m4.m5.m6*/
declare namespace m4.m5.m6 {
    namespace m7 {
        /** Exported class comment*/
        class c {
        }
    }
}
/** module comment of m5.m6.m7*/
declare namespace m5.m6.m7 {
    /** module m8 comment*/
    namespace m8 {
        /** Exported class comment*/
        class c {
        }
    }
}
declare namespace m6.m7 {
    namespace m8 {
        /** Exported class comment*/
        class c {
        }
    }
}
declare namespace m7.m8 {
    /** module m9 comment*/
    namespace m9 {
        /** Exported class comment*/
        class c {
        }
        class e {
        }
    }
}
