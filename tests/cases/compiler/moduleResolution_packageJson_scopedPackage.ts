// @noImplicitReferences: true
// @traceResolution: true

// @Filename: /node_modules/@foo/bar/package.json
{ "types": "types.d.ts" }

// @Filename: /node_modules/@foo/bar/types.d.ts
export const x: number;

// @Filename: /a.ts
import { x } from "@foo/bar";
