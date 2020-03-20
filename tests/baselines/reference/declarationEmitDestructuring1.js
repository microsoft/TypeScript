//// [declarationEmitDestructuring1.ts]
function foo([a, b, c]: [string, string, string]): void { }
function far([a, [b], [[c]]]: [number, boolean[], string[][]]): void { }
function bar({a1, b1, c1}: { a1: number, b1: boolean, c1: string }): void { }
function baz({a2, b2: {b1, c1}}: { a2: number, b2: { b1: boolean, c1: string } }): void { } 


//// [declarationEmitDestructuring1.js]
function foo(_a) {
    var a = _a[0], b = _a[1], c = _a[2];
}
function far(_b) {
    var a = _b[0], b = _b[1][0], c = _b[2][0][0];
}
function bar(_c) {
    var a1 = _c.a1, b1 = _c.b1, c1 = _c.c1;
}
function baz(_d) {
    var a2 = _d.a2, _e = _d.b2, b1 = _e.b1, c1 = _e.c1;
}


//// [declarationEmitDestructuring1.d.ts]
declare function foo([a, b, c]: [string, string, string]): void;
declare function far([a, [b], [[c]]]: [number, boolean[], string[][]]): void;
declare function bar({ a1, b1, c1 }: {
    a1: number;
    b1: boolean;
    c1: string;
}): void;
declare function baz({ a2, b2: { b1, c1 } }: {
    a2: number;
    b2: {
        b1: boolean;
        c1: string;
    };
}): void;
