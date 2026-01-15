// @noImplicitReferences: true
// @traceResolution: true

// Copy of `moduleResolution_packageJson_notAtPackageRoot` with `foo/@bar` instead of `foo/bar`. Should behave identically.

// @Filename: /node_modules/foo/@bar/index.js
not read

// @Filename: /node_modules/foo/package.json
{ "name": "foo", "version": "1.2.3", "types": "types.d.ts" }

// @Filename: /node_modules/foo/types.d.ts
export const x = 0;

// @Filename: /a.ts
import { x } from "foo/@bar";
