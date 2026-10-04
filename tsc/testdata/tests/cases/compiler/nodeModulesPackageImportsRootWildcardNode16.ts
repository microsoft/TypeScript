// @module: node16
// @declaration: true
// @traceResolution: true
// @filename: package.json
{
    "name": "package",
    "private": true,
    "type": "module",
    "imports": {
        "#/*": "./src/*"
    }
}
// @filename: src/foo.ts
export const foo = "foo";
// @filename: index.ts
// esm format file
import { foo } from "#/foo.js";
foo;
