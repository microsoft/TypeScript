//// [tests/cases/conformance/types/import/importTypeAmbient.ts] ////

//// [importTypeAmbient.ts]
declare module "foo" {
    interface Point {
        x: number;
        y: number;
    }
    export = Point;
}
const x: import("foo") = { x: 0, y: 0 };

declare module "foo2" {
    namespace Bar {
        interface I {
            a: string;
            b: number;
        }
    }

    namespace Baz {
        interface J {
            a: number;
            b: string;
        }
    }

    class Bar {
        item: Bar.I;
        constructor(input: Baz.J);
    }
}

let y: import("foo2").Bar.I = { a: "", b: 0 };

class Bar2 {
    item: {a: string, b: number, c: object};
    constructor(input?: any) {}
}

let shim: typeof import("foo2") = {
    Bar: Bar2
};


//// [importTypeAmbient.js]
const x = { x: 0, y: 0 };
let y = { a: "", b: 0 };
class Bar2 {
    item;
    constructor(input) { }
}
let shim = {
    Bar: Bar2
};
