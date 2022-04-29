// @noImplicitReferences: true
// @traceResolution: true

// @Filename: /node_modules/foo/bar/index.js
not read

// @Filename: /node_modules/foo/package.json
{ "name": "foo", "version": "1.2.3", "types": "types.d.ts" }

// @Filename: /node_modules/foo/types.d.ts
export const x = 0;

// @Filename: /a.ts
import { x } from "foo/bar";
