// @allowJs: true
// @noImplicitReferences: true
// @traceResolution: true
// @noEmit: true

// @Filename: /src/module-a.d.ts
export const x = 10;

// @Filename: /src/module-a.js
exports.x = 0;

// @Filename: /src/index.ts
import { x } from "./module-a.js";
