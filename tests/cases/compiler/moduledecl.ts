// @declaration: true
// @target: es5

namespace a {
}

namespace b.a {
}

namespace c.a.b {
    import ma = a;
}

namespace mImport {
    import d = a;
    import e = b.a;
    import d1 = a;
    import e1 = b.a;
}

namespace m0 {
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

namespace m1 {
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

namespace m {
    export namespace m2 {
        var a = 10;
        export var b: number;
    }

    export namespace m3 {
        export var c: number;
    }
}

namespace m {

    export namespace m25 {
        export namespace m5 {
            export var c: number;
        }
    }
}

namespace m13 {
    export namespace m4 {
        export namespace m2 {
            export namespace m3 {
                export var c: number;
            }
        }

        export function f() {
            return 20;
        }
    }
}

declare namespace m4 {
    export var b;
}

declare namespace m5 {
    export var c;
}

declare namespace m43 {
    export var b;
}

declare namespace m55 {
    export var c;
}

declare module "m3" {
    export var b: number;
}

namespace exportTests {
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

declare namespace mAmbient {
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

    namespace m3 {
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

