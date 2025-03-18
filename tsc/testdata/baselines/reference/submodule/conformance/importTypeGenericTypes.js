//// [tests/cases/conformance/types/import/importTypeGenericTypes.ts] ////

//// [foo.ts]
interface Point<T> {
    x: number;
    y: number;
    data: T;
}
export = Point;

//// [foo2.ts]
namespace Bar {
    export interface I<T> {
        a: string;
        b: number;
        data: T;
    }
}

export namespace Baz {
    export interface J<T> {
        a: number;
        b: string;
        data: T;
    }
}

class Bar<T> {
    item: Bar.I<T>;
    constructor(input: Baz.J<T>) {}
}
export { Bar }

//// [usage.ts]
export const x: import("./foo")<{x: number}> = { x: 0, y: 0, data: {x: 12} };
export let y: import("./foo2").Bar.I<{x: number}> = { a: "", b: 0, data: {x: 12} };

export class Bar2<T> {
    item: {a: string, b: number, c: object, data: T};
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
exports.x = { x: 0, y: 0, data: { x: 12 } };
exports.y = { a: "", b: 0, data: { x: 12 } };
class Bar2 {
    item;
    constructor(input) { }
}
exports.Bar2 = Bar2;
exports.shim = {
    Bar: Bar2
};
