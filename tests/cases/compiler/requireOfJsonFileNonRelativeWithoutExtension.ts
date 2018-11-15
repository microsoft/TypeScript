// @module: commonjs
// @outdir: out/
// @allowJs: true
// @fullEmitPaths: true
// @resolveJsonModule: true

// @Filename: /src/projects/file1.ts
import d = require("d.json"); // Should fail
import e = require("e"); // Should fail

// @Filename: /src/projects/node_modules/b.json
{
    "a": true,
    "b": "hello"
}

// @Filename: /src/projects/node_modules/e.json
{
    "a": true,
    "b": "hello"
}

// @Filename: /src/node_modules/c.json
{
    "a": true,
    "b": "hello"
}