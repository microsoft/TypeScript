// @module: commonjs
// @outdir: out/
// @allowJs: true
// @fullEmitPaths: true
// @resolveJsonModule: true

// @Filename: /src/projects/file1.ts
import f = require("f"); // should work to f.ts
let fnumber: number = f;

// @Filename: /src/node_modules/f.json
{
    "a": true,
    "b": "hello"
}

// @Filename: /src/node_modules/f.ts
export = 10;
