// @noImplicitReferences: true
// @traceResolution: true
// @allowJs: true
// @esModuleInterop: true
// @fullEmitPaths: true

// @Filename: /node_modules/foo/bar/foobar.js
module.exports = { a: 10 };

// @Filename: /a.ts
import foobar from "foo/bar/foobar.js";

// @Filename: /tsconfig.json
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "*": ["node_modules/*", "src/types"]
        },
        "allowJs": true,
        "outDir": "bin"
    }
}
