// @module: commonjs
// @outdir: out/
// @allowJs: true
// @fullEmitPaths: true
// @resolveJsonModule: true

// @Filename: file1.ts
import c1 = require('./c'); // resolves to c.ts 
let x2 = c1.a;
import c2 = require('./c.json'); // resolves to c.json
if (x2) {
    let b = c2.b;
    let x = (c1.b === b);
}

// @Filename: b.json
{
    "a": true,
    "b": "hello"
}

// @Filename: c.json
{
    "a": true,
    "b": "hello"
}

// @Filename: c.ts
export = { a: true, b: "hello" };