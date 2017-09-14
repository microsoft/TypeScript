// @noImplicitReferences: true

// @Filename: /node_modules/a/index.d.ts
import X from "x";
export function a(x: X): void;

// @Filename: /node_modules/a/node_modules/x/index.d.ts
export default class X {
    private x: number;
}

// @Filename: /node_modules/a/node_modules/x/package.json
{ "name": "x", "version": "1.2.3" }

// @Filename: /node_modules/b/index.d.ts
import X from "x";
export const b: X;

// @Filename: /node_modules/b/node_modules/x/index.d.ts
content not parsed

// @Filename: /node_modules/b/node_modules/x/package.json
{ "name": "x", "version": "1.2.3" }

// @Filename: /node_modules/c/index.d.ts
import X from "x";
export const c: X;

// @Filename: /node_modules/c/node_modules/x/index.d.ts
export default class X {
    private x: number;
}

// @Filename: /node_modules/c/node_modules/x/package.json
{ "name": "x", "version": "1.2.4" }

// @Filename: /src/a.ts
import { a } from "a";
import { b } from "b";
import { c } from "c";
a(b); // Works
a(c); // Error, these are from different versions of the library.
