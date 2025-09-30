// @noImplicitReferences: true
// @traceResolution: true

// @Filename: /a.ts
import { foo } from "foo";

// @Filename: /tsconfig.json
{
    "compilerOptions": {
        "baseUrl": ".",
        "ignoreDeprecations": "6.0",
        "paths": {
            "foo": ["foo/foo.ts"]
        }
    }
}
