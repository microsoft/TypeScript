// @noImplicitReferences: true
// @traceResolution: true
// @allowJs: true

// @Filename: /foo/foo.ts
export function foo() {}

// @Filename: /bar/bar.js
export function bar() {}

// @Filename: /a.ts
import { foo } from "foo";
import { bar } from "bar";

// @Filename: /tsconfig.json
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "foo": ["foo/foo.ts"],
            "bar": ["bar/bar.js"]
        },
        "allowJs": true,
        "outDir": "bin"
    }
}
