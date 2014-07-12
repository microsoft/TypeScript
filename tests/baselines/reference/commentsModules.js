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
}
m1.fooExport();
var myvar = new m1.m2.c();
/** module comment of m2.m3*/
module m2.m3 {
    /** Exported class comment*/
    export class c {
    }
}
new m2.m3.c();
/** module comment of m3.m4.m5*/
module m3.m4.m5 {
    /** Exported class comment*/
    export class c {
    }
}
new m3.m4.m5.c();
/** module comment of m4.m5.m6*/
module m4.m5.m6 {
    export module m7 {
        /** Exported class comment*/
        export class c {
        }
    }
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
var m1;
(function (m1) {
    m1.b;
    function foo() {
        return m1.b;
    }
    (function (m2) {
        var c = (function () {
            function c() {
            }
            return c;
        })();
        m2.c = c;
        ;
        m2.i = new c();
    })(m1.m2 || (m1.m2 = {}));
    var m2 = m1.m2;
    function fooExport() {
        return foo();
    }
    m1.fooExport = fooExport;
    function foo2Export(a) {
    }
    m1.foo2Export = foo2Export;
    function foo3Export() {
    }
    m1.foo3Export = foo3Export;
    function foo4Export() {
    }
})(m1 || (m1 = {}));
m1.fooExport();
var myvar = new m1.m2.c();
var m2;
(function (m2) {
    (function (m3) {
        var c = (function () {
            function c() {
            }
            return c;
        })();
        m3.c = c;
    })(m2.m3 || (m2.m3 = {}));
    var m3 = m2.m3;
})(m2 || (m2 = {}));
new m2.m3.c();
var m3;
(function (m3) {
    (function (m4) {
        (function (m5) {
            var c = (function () {
                function c() {
                }
                return c;
            })();
            m5.c = c;
        })(m4.m5 || (m4.m5 = {}));
        var m5 = m4.m5;
    })(m3.m4 || (m3.m4 = {}));
    var m4 = m3.m4;
})(m3 || (m3 = {}));
new m3.m4.m5.c();
var m4;
(function (m4) {
    (function (m5) {
        (function (m6) {
            (function (m7) {
                var c = (function () {
                    function c() {
                    }
                    return c;
                })();
                m7.c = c;
            })(m6.m7 || (m6.m7 = {}));
            var m7 = m6.m7;
        })(m5.m6 || (m5.m6 = {}));
        var m6 = m5.m6;
    })(m4.m5 || (m4.m5 = {}));
    var m5 = m4.m5;
})(m4 || (m4 = {}));
new m4.m5.m6.m7.c();
var m5;
(function (m5) {
    (function (m6) {
        (function (m7) {
            (function (m8) {
                var c = (function () {
                    function c() {
                    }
                    return c;
                })();
                m8.c = c;
            })(m7.m8 || (m7.m8 = {}));
            var m8 = m7.m8;
        })(m6.m7 || (m6.m7 = {}));
        var m7 = m6.m7;
    })(m5.m6 || (m5.m6 = {}));
    var m6 = m5.m6;
})(m5 || (m5 = {}));
new m5.m6.m7.m8.c();
var m6;
(function (m6) {
    (function (m7) {
        (function (m8) {
            var c = (function () {
                function c() {
                }
                return c;
            })();
            m8.c = c;
        })(m7.m8 || (m7.m8 = {}));
        var m8 = m7.m8;
    })(m6.m7 || (m6.m7 = {}));
    var m7 = m6.m7;
})(m6 || (m6 = {}));
new m6.m7.m8.c();
var m7;
(function (m7) {
    (function (m8) {
        (function (m9) {
            var c = (function () {
                function c() {
                }
                return c;
            })();
            m9.c = c;
            var d = (function () {
                function d() {
                }
                return d;
            })();
            var e = (function () {
                function e() {
                }
                return e;
            })();
            m9.e = e;
        })(m8.m9 || (m8.m9 = {}));
        var m9 = m8.m9;
    })(m7.m8 || (m7.m8 = {}));
    var m8 = m7.m8;
})(m7 || (m7 = {}));
new m7.m8.m9.c();


//// [commentsModules.d.ts]
