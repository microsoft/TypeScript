// @module: commonjs
// @outdir: out/
// @allowJs: true
// @fullEmitPaths: true

// @Filename: file1.ts
import b1 = require('./b.json'); // error
let x = b1.a;
import b2 = require('./b.json'); // error
if (x) {
    let b = b2.b;
    x = (b1.b === b);
}

// @Filename: b.json
contents Not read