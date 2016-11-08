// @noImplicitReferences: true
// @traceResolution: true

// @Filename: /foo/foo.ts
export function foo() {}

// @Filename: /a.ts
import { foo } from "foo";

// @Filename: /tsconfig.json
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "foo": ["foo/foo.ts"]
        }
    }
}
