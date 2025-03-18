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
Object.defineProperty(exports, "__esModule", { value: true });
//// [foo2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bar = void 0;
class Bar {
    item;
    constructor(input) { }
}
exports.Bar = Bar;
//// [usage.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shim = exports.Bar2 = exports.y = exports.x = void 0;
exports.x = { x: 0, y: 0 };
exports.y = { a: "", b: 0 };
class Bar2 {
    item;
    constructor(input) { }
}
exports.Bar2 = Bar2;
exports.shim = {
    Bar: Bar2
};
