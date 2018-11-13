// @module: commonjs
// @outdir: out/
// @allowJs: true
// @fullEmitPaths: true
// @resolveJsonModule: true

// @Filename: /src/projects/file1.ts
import b1 = require('b.json');
let x = b1.a;
import b2 = require('c.json');
if (x) {
    let b = b2.b;
    x = (b1.b === b);
}

// @Filename: /src/projects/node_modules/b.json
{
    "a": true,
    "b": "hello"
}

// @Filename: /src/node_modules/c.json
{
    "a": true,
    "b": "hello"
}