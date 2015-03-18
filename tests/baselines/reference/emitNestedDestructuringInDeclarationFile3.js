//// [emitNestedDestructuringInDeclarationFile3.ts]
var {a: [b, c]} = { a: [10, "HI"] };
var [{x, y}, {t:{z}}] = [{ x: true, y: 200 }, {t:{z: "string" }}];
var [[[foo, bar, {baz}], e1], e2] = [[[10, "bar", { baz: "baz" }], true], 2000];

//// [emitNestedDestructuringInDeclarationFile3.js]
var _a = ({
    a: [
        10,
        "HI"
    ]
}).a, b = _a[0], c = _a[1];
var _b = [
    {
        x: true,
        y: 200
    },
    {
        t: {
            z: "string"
        }
    }
], _c = _b[0], x = _c.x, y = _c.y, z = _b[1].t.z;
var _d = [
    [
        [
            10,
            "bar",
            {
                baz: "baz"
            }
        ],
        true
    ],
    2000
], _e = _d[0], _f = _e[0], foo = _f[0], bar = _f[1], baz = _f[2].baz, e1 = _e[1], e2 = _d[1];


//// [emitNestedDestructuringInDeclarationFile3.d.ts]
declare var b: number, c: string;
declare var x: boolean, y: number, z: string;
declare var foo: number, bar: string, baz: string, e1: boolean, e2: number;
