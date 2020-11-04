// @noImplicitReferences: true
// @traceResolution: true
// @noEmit: true

// @Filename: /src/node_modules/module-a/package.json
{ "main": "./module-a.js" }

// @Filename: /src/node_modules/module-a/module-a.d.ts
export const x = 10;

// @Filename: /src/node_modules/module-a/module-a.js
exports.x = 0;

// @Filename: /src/index.ts
import { x } from "module-a";
