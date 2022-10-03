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
    var c1 = /** @class */ (function () {
        function c1() {
        }
        return c1;
    }());
})(m0 || (m0 = {}));
var m1;
(function (m1) {
    function f1() {
    }
    m1.f1 = f1;
    function f2(ns) {
    }
    m1.f2 = f2;
    var c1 = /** @class */ (function () {
        function c1(n, n2, n3, n4) {
            this.n = n;
            this.n2 = n2;
            this.n3 = n3;
            this.n4 = n4;
        }
        c1.prototype.d = function () {
            return "Hello";
        };
        return c1;
    }());
    m1.c1 = c1;
})(m1 || (m1 = {}));
var m;
(function (m) {
    var m2;
    (function (m2) {
        var a = 10;
    })(m2 = m.m2 || (m.m2 = {}));
    var m3;
    (function (m3) {
    })(m3 = m.m3 || (m.m3 = {}));
})(m || (m = {}));
(function (m) {
    var m25;
    (function (m25) {
        var m5;
        (function (m5) {
        })(m5 = m25.m5 || (m25.m5 = {}));
    })(m25 = m.m25 || (m.m25 = {}));
})(m || (m = {}));
var m13;
(function (m13) {
    var m4;
    (function (m4) {
        var m2;
        (function (m2) {
            var m3;
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
    var C1_public = /** @class */ (function () {
        function C1_public() {
        }
        C1_public.prototype.f2 = function () {
            return 30;
        };
        C1_public.prototype.f3 = function () {
            return "string";
        };
        return C1_public;
    }());
    exportTests.C1_public = C1_public;
    var C2_private = /** @class */ (function () {
        function C2_private() {
        }
        C2_private.prototype.f2 = function () {
            return 30;
        };
        C2_private.prototype.f3 = function () {
            return "string";
        };
        return C2_private;
    }());
    var C3_public = /** @class */ (function () {
        function C3_public() {
        }
        C3_public.prototype.getC2_private = function () {
            return new C2_private();
        };
        C3_public.prototype.setC2_private = function (arg) {
        };
        Object.defineProperty(C3_public.prototype, "c2", {
            get: function () {
                return new C2_private();
            },
            enumerable: false,
            configurable: true
        });
        C3_public.prototype.getC1_public = function () {
            return new C1_public();
        };
        C3_public.prototype.setC1_public = function (arg) {
        };
        Object.defineProperty(C3_public.prototype, "c1", {
            get: function () {
                return new C1_public();
            },
            enumerable: false,
            configurable: true
        });
        return C3_public;
    }());
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


//// [moduledecl.d.ts]
declare module a {
}
declare module b.a {
}
declare module c.a.b {
}
declare module mImport {
}
declare module m0 {
}
declare module m1 {
    function f1(): void;
    function f2(s: string): any;
    function f2(n: number): any;
    class c1 {
        n: any;
        n2: number;
        private n3;
        private n4;
        a: () => string;
        private b;
        private static s1;
        static s2: any;
        d(): string;
        e: {
            x: number;
            y: string;
        };
        constructor(n: any, n2: number, n3: any, n4: string);
    }
    interface i1 {
        (): Object;
        [n: number]: c1;
    }
}
declare module m {
    module m2 {
        var b: number;
    }
    module m3 {
        var c: number;
    }
}
declare module m {
    module m25 {
        module m5 {
            var c: number;
        }
    }
}
declare module m13 {
    module m4 {
        module m2 {
            module m3 {
                var c: number;
            }
        }
        function f(): number;
    }
}
declare module m4 {
    var b: any;
}
declare module m5 {
    var c: any;
}
declare module m43 {
    var b: any;
}
declare module m55 {
    var c: any;
}
declare module "m3" {
    var b: number;
}
declare module exportTests {
    class C1_public {
        private f2;
        f3(): string;
    }
    class C3_public {
        private getC2_private;
        private setC2_private;
        private get c2();
        getC1_public(): C1_public;
        setC1_public(arg: C1_public): void;
        get c1(): C1_public;
    }
}
declare module mAmbient {
    class C {
        myProp: number;
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
    module m3 {
        class C {
            myProp: number;
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
declare function foo(): mAmbient.C;
declare var cVar: mAmbient.C;
declare var aVar: mAmbient.C;
declare var bB: mAmbient.B;
declare var eVar: mAmbient.e;
declare function m3foo(): mAmbient.m3.C;
declare var m3cVar: mAmbient.m3.C;
declare var m3aVar: mAmbient.m3.C;
declare var m3bB: mAmbient.m3.B;
declare var m3eVar: mAmbient.m3.e;
