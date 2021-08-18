//// [objectLiteralNormalization.ts]
// Object literals in unions are normalized upon widening
let a1 = [{ a: 0 }, { a: 1, b: "x" }, { a: 2, b: "y", c: true }][0];
a1.a;  // number
a1.b;  // string | undefined
a1.c;  // boolean | undefined
a1 = { a: 1 };
a1 = { a: 0, b: 0 };  // Error
a1 = { b: "y" };  // Error
a1 = { c: true };  // Error

let a2 = [{ a: 1, b: 2 }, { a: "abc" }, {}][0];
a2.a;  // string | number | undefined
a2.b;  // number | undefined
a2 = { a: 10, b: 20 };
a2 = { a: "def" };
a2 = {};
a2 = { a: "def", b: 20 };  // Error
a2 = { a: 1 };  // Error

// Object literals containing spreads are not normalized
declare let b1: { a: string, b: string } | { b: string, c: string };
let b2 = { ...b1, z: 55 };
let b3 = { ...b2 };

// Before widening {} acts like { [x: string]: undefined }, which is a
// subtype of types with all optional properties
declare let opts: { foo?: string, bar?: string, baz?: boolean };
let c1 = !true ? {} : opts;
let c2 = !true ? opts : {};
let c3 = !true ? { a: 0, b: 0 } : {};
let c4 = !true ? {} : { a: 0, b: 0 };

// Normalization applies to nested properties
let d1 = [{ kind: 'a', pos: { x: 0, y: 0 } }, { kind: 'b', pos: !true ? { a: "x" } : { b: 0 } }][0];
d1.kind;
d1.pos;
d1.pos.x;
d1.pos.y;
d1.pos.a;
d1.pos.b;

declare function f<T>(...items: T[]): T;
declare let data: { a: 1, b: "abc", c: true };

// Object literals are inferred as a single normalized union type
let e1 = f({ a: 1, b: 2 }, { a: "abc" }, {});
let e2 = f({}, { a: "abc" }, { a: 1, b: 2 });
let e3 = f(data, { a: 2 });
let e4 = f({ a: 2 }, data);


//// [objectLiteralNormalization.js]
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Object literals in unions are normalized upon widening
var a1 = [{ a: 0 }, { a: 1, b: "x" }, { a: 2, b: "y", c: true }][0];
a1.a; // number
a1.b; // string | undefined
a1.c; // boolean | undefined
a1 = { a: 1 };
a1 = { a: 0, b: 0 }; // Error
a1 = { b: "y" }; // Error
a1 = { c: true }; // Error
var a2 = [{ a: 1, b: 2 }, { a: "abc" }, {}][0];
a2.a; // string | number | undefined
a2.b; // number | undefined
a2 = { a: 10, b: 20 };
a2 = { a: "def" };
a2 = {};
a2 = { a: "def", b: 20 }; // Error
a2 = { a: 1 }; // Error
var b2 = __assign(__assign({}, b1), { z: 55 });
var b3 = __assign({}, b2);
var c1 = !true ? {} : opts;
var c2 = !true ? opts : {};
var c3 = !true ? { a: 0, b: 0 } : {};
var c4 = !true ? {} : { a: 0, b: 0 };
// Normalization applies to nested properties
var d1 = [{ kind: 'a', pos: { x: 0, y: 0 } }, { kind: 'b', pos: !true ? { a: "x" } : { b: 0 } }][0];
d1.kind;
d1.pos;
d1.pos.x;
d1.pos.y;
d1.pos.a;
d1.pos.b;
// Object literals are inferred as a single normalized union type
var e1 = f({ a: 1, b: 2 }, { a: "abc" }, {});
var e2 = f({}, { a: "abc" }, { a: 1, b: 2 });
var e3 = f(data, { a: 2 });
var e4 = f({ a: 2 }, data);


//// [objectLiteralNormalization.d.ts]
declare let a1: {
    a: number;
    b?: undefined;
    c?: undefined;
} | {
    a: number;
    b: string;
    c?: undefined;
} | {
    a: number;
    b: string;
    c: boolean;
};
declare let a2: {
    a: number;
    b: number;
} | {
    a: string;
    b?: undefined;
} | {
    a?: undefined;
    b?: undefined;
};
declare let b1: {
    a: string;
    b: string;
} | {
    b: string;
    c: string;
};
declare let b2: {
    z: number;
    a: string;
    b: string;
} | {
    z: number;
    b: string;
    c: string;
};
declare let b3: {
    z: number;
    a: string;
    b: string;
} | {
    z: number;
    b: string;
    c: string;
};
declare let opts: {
    foo?: string;
    bar?: string;
    baz?: boolean;
};
declare let c1: {
    foo?: string | undefined;
    bar?: string | undefined;
    baz?: boolean | undefined;
};
declare let c2: {
    foo?: string | undefined;
    bar?: string | undefined;
    baz?: boolean | undefined;
};
declare let c3: {
    a: number;
    b: number;
} | {
    a?: undefined;
    b?: undefined;
};
declare let c4: {
    a?: undefined;
    b?: undefined;
} | {
    a: number;
    b: number;
};
declare let d1: {
    kind: string;
    pos: {
        x: number;
        y: number;
        a?: undefined;
        b?: undefined;
    };
} | {
    kind: string;
    pos: {
        a: string;
        x?: undefined;
        y?: undefined;
        b?: undefined;
    } | {
        b: number;
        x?: undefined;
        y?: undefined;
        a?: undefined;
    };
};
declare function f<T>(...items: T[]): T;
declare let data: {
    a: 1;
    b: "abc";
    c: true;
};
declare let e1: {
    a: number;
    b: number;
} | {
    a: string;
    b?: undefined;
} | {
    a?: undefined;
    b?: undefined;
};
declare let e2: {
    a?: undefined;
    b?: undefined;
} | {
    a: string;
    b?: undefined;
} | {
    a: number;
    b: number;
};
declare let e3: {
    a: 1;
    b: "abc";
    c: true;
};
declare let e4: {
    a: 1;
    b: "abc";
    c: true;
};
