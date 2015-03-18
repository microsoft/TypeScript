//// [emitNestedDestructuringInDeclarationFile1.ts]
var { a, b: {c, d}} = { a: 10, b: { c: true, d: "hello" } };
var { y: {w: {id1: {x}, id2}, z}} = { y: { w: { id1: { x: 10 }, id2: "world" }, z: true } };

var [[j]] = [[{}]];
var [[foo, bar]] = [[10, 20, "undefined"]];
var [[foo1, bar1, [baz]]] = [[false, true, ["undefined"]]];

//// [emitNestedDestructuringInDeclarationFile1.js]
var _a = {
    a: 10,
    b: {
        c: true,
        d: "hello"
    }
}, a = _a.a, _b = _a.b, c = _b.c, d = _b.d;
var _c = ({
    y: {
        w: {
            id1: {
                x: 10
            },
            id2: "world"
        },
        z: true
    }
}).y, _d = _c.w, x = _d.id1.x, id2 = _d.id2, z = _c.z;
var j = ([
    [
        {}
    ]
])[0][0];
var _e = ([
    [
        10,
        20,
        "undefined"
    ]
])[0], foo = _e[0], bar = _e[1];
var _f = ([
    [
        false,
        true,
        [
            "undefined"
        ]
    ]
])[0], foo1 = _f[0], bar1 = _f[1], baz = _f[2][0];


//// [emitNestedDestructuringInDeclarationFile1.d.ts]
declare var a: number, c: boolean, d: string;
declare var x: number, id2: string, z: boolean;
declare var j: {};
declare var foo: number, bar: number;
declare var foo1: boolean, bar1: boolean, baz: string;
