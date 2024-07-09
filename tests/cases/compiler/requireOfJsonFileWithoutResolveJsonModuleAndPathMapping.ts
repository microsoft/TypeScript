// @noImplicitReferences: true
// @traceResolution: true
// @allowJs: true
// @esModuleInterop: true
// @fullEmitPaths: true
// @resolveJsonModule: false

// @Filename: /node_modules/foo/bar/foobar.json
{ "a": 10 }

// @Filename: /a.ts
import foobar from "foo/bar/foobar.json";

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
