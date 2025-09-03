// @noImplicitReferences: true
// @traceResolution: true
// @allowJs: true
// @esModuleInterop: true
// @fullEmitPaths: true
// @resolveJsonModule: true

// @Filename: /node_modules/foo/bar/foobar.json
{ "a": 10 }

// @Filename: /a.ts
import foobar from "foo/bar/foobar.json";

// @Filename: /tsconfig.json
{
    "compilerOptions": {
        "baseUrl": ".",
        "ignoreDeprecations": "6.0",
        "paths": {
            "*": ["node_modules/*", "src/types"]
        },
        "allowJs": true,
        "outDir": "bin"
    }
}
