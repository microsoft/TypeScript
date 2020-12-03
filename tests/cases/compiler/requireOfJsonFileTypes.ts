// @module: commonjs
// @outdir: out/
// @allowJs: true
// @strictNullChecks: true
// @fullEmitPaths: true
// @resolveJsonModule: true
// @declaration: true

// @Filename: file1.ts
import b = require('./b.json');
import c = require('./c.json');
import d = require('./d.json');
import e = require('./e.json');
import f = require('./f.json');
import g = require('./g.json');

let booleanLiteral: boolean, nullLiteral: null;
let stringLiteral: string;
let numberLiteral: number;

booleanLiteral = b.a;
stringLiteral = b.b;
nullLiteral = b.c;
booleanLiteral = b.d;
const stringOrNumberOrNull: string | number | null = c[0];
stringLiteral = d;
numberLiteral = e;
numberLiteral = f[0];
booleanLiteral = g[0];

// @Filename: b.json
{
    "a": true,
    "b": "hello",
    "c": null,
    "d": false
}

// @Filename: c.json
["a", null, "string"]

// @Filename: d.json
"dConfig"

// @Filename: e.json
-10

// @Filename: f.json
[-10, 30]

// @Filename: g.json
[true, false]