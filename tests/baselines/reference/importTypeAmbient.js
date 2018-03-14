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
var x = { x: 0, y: 0 };
var y = { a: "", b: 0 };
var Bar2 = /** @class */ (function () {
    function Bar2(input) {
    }
    return Bar2;
}());
var shim = {
    Bar: Bar2
};


//// [importTypeAmbient.d.ts]
declare module "foo" {
    interface Point {
        x: number;
        y: number;
    }
    export = Point;
}
declare const x: import("foo");
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
declare let y: import("foo2").Bar.I;
declare class Bar2 {
    item: {
        a: string;
        b: number;
        c: object;
    };
    constructor(input?: any);
}
declare let shim: typeof import("foo2");
