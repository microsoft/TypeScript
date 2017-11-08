// @noImplicitReferences: true
// @traceResolution: true

// Copy of `moduleResolution_packageJson_notAtPackageRoot` with `foo/@bar` instead of `foo/bar`. Should behave identically.

// @Filename: /node_modules/foo/@bar/package.json
{ "types": "types.d.ts" }

// @Filename: /node_modules/foo/package.json
{}

// @Filename: /node_modules/foo/@bar/types.d.ts
export const x: number;

// @Filename: /a.ts
import { x } from "foo/@bar";
