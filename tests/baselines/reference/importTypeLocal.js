//// [tests/cases/conformance/types/import/importTypeLocal.ts] ////

//// [foo.ts]
interface Point {
    x: number;
    y: number;
}
export = Point;

//// [foo2.ts]
namespace Bar {
    export interface I {
        a: string;
        b: number;
    }
}

export namespace Baz {
    export interface J {
        a: number;
        b: string;
    }
}

class Bar {
    item: Bar.I;
    constructor(input: Baz.J) {}
}
export { Bar }

//// [usage.ts]
export const x: import("./foo") = { x: 0, y: 0 };
export let y: import("./foo2").Bar.I = { a: "", b: 0 };

export class Bar2 {
    item: {a: string, b: number, c: object};
    constructor(input?: any) {}
}

export let shim: typeof import("./foo2") = {
    Bar: Bar2
};


//// [foo.js]
"use strict";
exports.__esModule = true;
//// [foo2.js]
"use strict";
exports.__esModule = true;
exports.Bar = void 0;
var Bar = /** @class */ (function () {
    function Bar(input) {
    }
    return Bar;
}());
exports.Bar = Bar;
//// [usage.js]
"use strict";
exports.__esModule = true;
exports.shim = exports.Bar2 = exports.y = exports.x = void 0;
exports.x = { x: 0, y: 0 };
exports.y = { a: "", b: 0 };
var Bar2 = /** @class */ (function () {
    function Bar2(input) {
    }
    return Bar2;
}());
exports.Bar2 = Bar2;
exports.shim = {
    Bar: Bar2
};


//// [foo.d.ts]
interface Point {
    x: number;
    y: number;
}
export = Point;
//// [foo2.d.ts]
declare namespace Bar {
    interface I {
        a: string;
        b: number;
    }
}
export declare namespace Baz {
    interface J {
        a: number;
        b: string;
    }
}
declare class Bar {
    item: Bar.I;
    constructor(input: Baz.J);
}
export { Bar };
//// [usage.d.ts]
export declare const x: import("./foo");
export declare let y: import("./foo2").Bar.I;
export declare class Bar2 {
    item: {
        a: string;
        b: number;
        c: object;
    };
    constructor(input?: any);
}
export declare let shim: typeof import("./foo2");
