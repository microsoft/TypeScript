// @module: commonjs
// @outdir: out/

// @Filename: file1.ts
import b1 = require('./b');
let x = b1;
import b2 = require('./b.json');
if (x) {
    x = b2;
}

// @Filename: b.json
{
}