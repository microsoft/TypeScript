//// [tests/cases/compiler/declarationEmitDestructuring1.ts] ////

//// [declarationEmitDestructuring1.ts]
function foo([a, b, c]: [string, string, string]): void { }
function far([a, [b], [[c]]]: [number, boolean[], string[][]]): void { }
function bar({a1, b1, c1}: { a1: number, b1: boolean, c1: string }): void { }
function baz({a2, b2: {b1, c1}}: { a2: number, b2: { b1: boolean, c1: string } }): void { } 


//// [declarationEmitDestructuring1.js]
function foo(_a) {
    var a = _a[0], b = _a[1], c = _a[2];
}
function far(_a) {
    var a = _a[0], b = _a[1][0], c = _a[2][0][0];
}
function bar(_a) {
    var a1 = _a.a1, b1 = _a.b1, c1 = _a.c1;
}
function baz(_a) {
    var a2 = _a.a2, _b = _a.b2, b1 = _b.b1, c1 = _b.c1;
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
