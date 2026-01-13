// @typeScriptVersion: 6.0
// @filename: /foo/tsconfig.json
{
    "compilerOptions": {
        "moduleDetection": "auto",
        "outFile": "dist.js",
        "ignoreDeprecations": "6.0"
    }
}

// @filename: /foo/a.ts
const a = 1;

// @filename: /foo/b.ts
const b = 1;