// @noImplicitReferences: true
// @traceResolution: true
// @allowJs: true

// @filename: /root/src/foo.ts
export function foo() {}

// @filename: /root/src/bar.js
export function bar() {}

// @filename: /root/a.ts
import { foo } from "/foo";
import { bar } from "/bar";

// @filename: /root/tsconfig.json
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "*": ["./src/*"]
        },
        "allowJs": true,
        "outDir": "bin"
    }
}
