// @module: commonjs
// @target: es2015
// @noImplicitReferences: true
// @traceResolution: true

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
