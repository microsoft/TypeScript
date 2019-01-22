// @noImplicitReferences: true
// @traceResolution: true
// @allowJs: true

// @filename: /root/import/foo.ts
export function foo() {}

// @filename: /root/client/bar.js
export function bar() {}

// @filename: /root/src/a.ts
import { foo } from "/import/foo";
import { bar } from "/client/bar";

// @filename: /root/tsconfig.json
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "/client/*": ["./client/*"],
            "/import/*": ["./import/*"]
        },
        "allowJs": true,
        "outDir": "bin"
    }
}
