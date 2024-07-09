// @target: ES5
// @declaration: true
// @removeComments: false
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