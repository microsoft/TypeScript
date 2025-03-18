//// [tests/cases/compiler/moduledecl.ts] ////

//// [moduledecl.ts]
module a {
}

module b.a {
}

module c.a.b {
    import ma = a;
}

module mImport {
    import d = a;
    import e = b.a;
    import d1 = a;
    import e1 = b.a;
}

module m0 {
    function f1() {
    }

    function f2(s: string);
    function f2(n: number);
    function f2(ns: any) {
    }

    class c1 {
        public a : ()=>string;
        private b: ()=>number;
        private static s1;
        public static s2;
    }

    interface i1 {
        () : Object;
        [n: number]: c1;
    }

    import m2 = a;
    import m3 = b;
    import m4 = b.a;
    import m5 = c;
    import m6 = c.a;
    import m7 = c.a.b;
}

module m1 {
    export function f1() {
    }

    export function f2(s: string);
    export function f2(n: number);
    export function f2(ns: any) {
    }

    export class c1 {
        public a: () =>string;
        private b: () =>number;
        private static s1;
        public static s2;

        public d() {
            return "Hello";
        }

        public e: { x: number; y: string; };
        constructor (public n, public n2: number, private n3, private n4: string) {
        }
    }

    export interface i1 {
        () : Object;
        [n: number]: c1;
    }

    import m2 = a;
    import m3 = b;
    import m4 = b.a;
    import m5 = c;
    import m6 = c.a;
    import m7 = c.a.b;
}

module m {
    export module m2 {
        var a = 10;
        export var b: number;
    }

    export module m3 {
        export var c: number;
    }
}

module m {

    export module m25 {
        export module m5 {
            export var c: number;
        }
    }
}

module m13 {
    export module m4 {
        export module m2 {
            export module m3 {
                export var c: number;
            }
        }

        export function f() {
            return 20;
        }
    }
}

declare module m4 {
    export var b;
}

declare module m5 {
    export var c;
}

declare module m43 {
    export var b;
}

declare module m55 {
    export var c;
}

declare module "m3" {
    export var b: number;
}

module exportTests {
    export class C1_public {
        private f2() {
            return 30;
        }

        public f3() {
            return "string";
        }
    }
    class C2_private {
        private f2() {
            return 30;
        }

        public f3() {
            return "string";
        }
    }

    export class C3_public {
        private getC2_private() {
            return new C2_private();
        }
        private setC2_private(arg: C2_private) {
        }
        private get c2() {
            return new C2_private();
        }
        public getC1_public() {
            return new C1_public();
        }
        public setC1_public(arg: C1_public) {
        }
        public get c1() {
            return new C1_public();
        }
    }
}

declare module mAmbient {
    class C {
        public myProp: number;
    }

    function foo() : C;
    var aVar: C;
    interface B {
        x: number;
        y: C;
    }
    enum e {
        x,
        y,
        z
    }

    module m3 {
        class C {
            public myProp: number;
        }

        function foo(): C;
        var aVar: C;
        interface B {
            x: number;
            y: C;
        }
        enum e {
            x,
            y,
            z
        }
    }
}

function foo() {
    return mAmbient.foo();
}

var cVar = new mAmbient.C();
var aVar = mAmbient.aVar;
var bB: mAmbient.B;
var eVar: mAmbient.e;

function m3foo() {
    return mAmbient.m3.foo();
}

var m3cVar = new mAmbient.m3.C();
var m3aVar = mAmbient.m3.aVar;
var m3bB: mAmbient.m3.B;
var m3eVar: mAmbient.m3.e;



//// [moduledecl.js]
var m0;
(function (m0) {
    function f1() {
    }
    function f2(ns) {
    }
    class c1 {
        a;
        b;
        static s1;
        static s2;
    }
    var m2 = a;
    var m3 = b;
    var m4 = b.a;
    var m5 = c;
    var m6 = c.a;
    var m7 = c.a.b;
})(m0 || (m0 = {}));
var m1;
(function (m1) {
    function f1() {
    }
    m1.f1 = f1;
    function f2(ns) {
    }
    m1.f2 = f2;
    class c1 {
        n;
        n2;
        n3;
        n4;
        a;
        b;
        static s1;
        static s2;
        d() {
            return "Hello";
        }
        e;
        constructor(n, n2, n3, n4) {
            this.n = n;
            this.n2 = n2;
            this.n3 = n3;
            this.n4 = n4;
        }
    }
    m1.c1 = c1;
    var m2 = a;
    var m3 = b;
    var m4 = b.a;
    var m5 = c;
    var m6 = c.a;
    var m7 = c.a.b;
})(m1 || (m1 = {}));
var m;
(function (m) {
    let m2;
    (function (m2) {
        var a = 10;
    })(m2 = m.m2 || (m.m2 = {}));
    let m3;
    (function (m3) {
    })(m3 = m.m3 || (m.m3 = {}));
})(m || (m = {}));
(function (m) {
    let m25;
    (function (m25) {
        let m5;
        (function (m5) {
        })(m5 = m25.m5 || (m25.m5 = {}));
    })(m25 = m.m25 || (m.m25 = {}));
})(m || (m = {}));
var m13;
(function (m13) {
    let m4;
    (function (m4) {
        let m2;
        (function (m2) {
            let m3;
            (function (m3) {
            })(m3 = m2.m3 || (m2.m3 = {}));
        })(m2 = m4.m2 || (m4.m2 = {}));
        function f() {
            return 20;
        }
        m4.f = f;
    })(m4 = m13.m4 || (m13.m4 = {}));
})(m13 || (m13 = {}));
var exportTests;
(function (exportTests) {
    class C1_public {
        f2() {
            return 30;
        }
        f3() {
            return "string";
        }
    }
    exportTests.C1_public = C1_public;
    class C2_private {
        f2() {
            return 30;
        }
        f3() {
            return "string";
        }
    }
    class C3_public {
        getC2_private() {
            return new C2_private();
        }
        setC2_private(arg) {
        }
        get c2() {
            return new C2_private();
        }
        getC1_public() {
            return new C1_public();
        }
        setC1_public(arg) {
        }
        get c1() {
            return new C1_public();
        }
    }
    exportTests.C3_public = C3_public;
})(exportTests || (exportTests = {}));
function foo() {
    return mAmbient.foo();
}
var cVar = new mAmbient.C();
var aVar = mAmbient.aVar;
var bB;
var eVar;
function m3foo() {
    return mAmbient.m3.foo();
}
var m3cVar = new mAmbient.m3.C();
var m3aVar = mAmbient.m3.aVar;
var m3bB;
var m3eVar;
