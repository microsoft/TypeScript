// @traceResolution: true
// @noImplicitReferences: true
// @currentDirectory: /
// This tests that an import is not matched by a `package.json` if typings are available in a higher `node_modules`.

// @filename: /tsconfig.json
{}

// @filename: /foo/node_modules/bar/package.json
{}

// @filename: /node_modules/@types/bar/index.d.ts
export const x: number;

// @filename: /foo/a.ts
import { x } from "bar";
x;
