//// [emitNestedDestructuringInDeclarationFile2.ts]
var [[j]] = [[{}]];
var [[foo, bar]] = [[10, 20, "undefined"]];
var [[foo1, bar1, [baz]]] = [[false, true, ["undefined"]]];

//// [emitNestedDestructuringInDeclarationFile2.js]
var j = ([
    [
        {}
    ]
])[0][0];
var _a = ([
    [
        10,
        20,
        "undefined"
    ]
])[0], foo = _a[0], bar = _a[1];
var _b = ([
    [
        false,
        true,
        [
            "undefined"
        ]
    ]
])[0], foo1 = _b[0], bar1 = _b[1], baz = _b[2][0];


//// [emitNestedDestructuringInDeclarationFile2.d.ts]
declare var j: {};
declare var foo: number, bar: number;
declare var foo1: boolean, bar1: boolean, baz: string;
