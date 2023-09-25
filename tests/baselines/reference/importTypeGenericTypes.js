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
var Bar = /** @class */ (function () {
    function Bar(input) {
    }
    return Bar;
}());
exports.Bar = Bar;
//// [usage.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shim = exports.Bar2 = exports.y = exports.x = void 0;
exports.x = { x: 0, y: 0, data: { x: 12 } };
exports.y = { a: "", b: 0, data: { x: 12 } };
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
interface Point<T> {
    x: number;
    y: number;
    data: T;
}
export = Point;
//// [foo2.d.ts]
declare namespace Bar {
}
export declare namespace Baz {
    interface J<T> {
        a: number;
        b: string;
        data: T;
    }
}
declare class Bar<T> {
    item: Bar.I<T>;
    constructor(input: Baz.J<T>);
}
export { Bar };
//// [usage.d.ts]
export declare const x: import("./foo")<{
    x: number;
}>;
export declare let y: import("./foo2").Bar.I<{
    x: number;
}>;
export declare class Bar2<T> {
    item: {
        a: string;
        b: number;
        c: object;
        data: T;
    };
    constructor(input?: any);
}
export declare let shim: typeof import("./foo2");


//// [DtsFileErrors]


foo2.d.ts(11,15): error TS2694: Namespace 'Bar' has no exported member 'I'.
usage.d.ts(4,44): error TS2694: Namespace '"foo2".Bar' has no exported member 'I'.


==== foo.d.ts (0 errors) ====
    interface Point<T> {
        x: number;
        y: number;
        data: T;
    }
    export = Point;
    
==== foo2.d.ts (1 errors) ====
    declare namespace Bar {
    }
    export declare namespace Baz {
        interface J<T> {
            a: number;
            b: string;
            data: T;
        }
    }
    declare class Bar<T> {
        item: Bar.I<T>;
                  ~
!!! error TS2694: Namespace 'Bar' has no exported member 'I'.
        constructor(input: Baz.J<T>);
    }
    export { Bar };
    
==== usage.d.ts (1 errors) ====
    export declare const x: import("./foo")<{
        x: number;
    }>;
    export declare let y: import("./foo2").Bar.I<{
                                               ~
!!! error TS2694: Namespace '"foo2".Bar' has no exported member 'I'.
        x: number;
    }>;
    export declare class Bar2<T> {
        item: {
            a: string;
            b: number;
            c: object;
            data: T;
        };
        constructor(input?: any);
    }
    export declare let shim: typeof import("./foo2");
    