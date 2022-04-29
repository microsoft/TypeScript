// @noImplicitReferences: true
// @traceResolution: true

// Loads from a "fake" nested package.json, not from the one at the root.

// @Filename: /node_modules/foo/bar/package.json
{ "types": "types.d.ts" }

// @Filename: /node_modules/foo/package.json
{}

// @Filename: /node_modules/foo/bar/types.d.ts
export const x: number;

// @Filename: /a.ts
import { x } from "foo/bar";
