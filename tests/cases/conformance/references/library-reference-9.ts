// @noImplicitReferences: true
// @traceResolution: true

// Use types search path

// @filename: /share/typelib/alpha/index.d.ts
declare var alpha: { a: string };

// @filename: /base/src/foo.ts
/// <reference types="alpha" />
var x: string = alpha.a;

// @filename: /tsconfig.json
{
    "compilerOptions": {
        "typesSearchPaths": [
            "./share/typelib"
        ]
    }
}
