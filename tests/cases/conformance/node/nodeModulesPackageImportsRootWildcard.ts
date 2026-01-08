// @module: nodenext
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
// @filename: src/features/bar.ts
export const bar = "bar";
// @filename: src/nested/deep/baz.ts
export const baz = "baz";
// @filename: index.ts
// esm format file
import { foo } from "#/foo.js";
import { bar } from "#/features/bar.js";
import { baz } from "#/nested/deep/baz.js";
foo;
bar;
baz;
// @filename: index.mts
// esm format file
import { foo } from "#/foo.js";
import { bar } from "#/features/bar.js";
import { baz } from "#/nested/deep/baz.js";
foo;
bar;
baz;
// @filename: index.cts
// cjs format file
import { foo } from "#/foo.js";
import { bar } from "#/features/bar.js";
import { baz } from "#/nested/deep/baz.js";
foo;
bar;
baz;
