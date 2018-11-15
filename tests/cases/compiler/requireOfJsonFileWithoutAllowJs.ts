// @module: commonjs
// @outdir: out/
// @fullEmitPaths: true
// @resolveJsonModule: true

// @Filename: file1.ts
import b1 = require('./b.json');
let x = b1.a;
import b2 = require('./b.json');
if (x) {
    let b = b2.b;
    x = (b1.b === b);
}

// @Filename: b.json
{
    "a": true,
    "b": "hello"
}