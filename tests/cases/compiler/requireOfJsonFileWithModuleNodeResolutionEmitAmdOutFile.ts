// @module: amd
// @moduleResolution: bundler
// @outFile: out/output.js
// @fullEmitPaths: true
// @resolveJsonModule: true

// @Filename: file1.ts
import * as b from './b.json';

// @Filename: b.json
{
    "a": true,
    "b": "hello"
}