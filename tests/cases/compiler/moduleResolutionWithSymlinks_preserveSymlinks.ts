// @noImplicitReferences: true

// @traceResolution: true
// @preserveSymlinks: true
// @moduleResolution: node

// @filename: /linked/index.d.ts
// @symlink: /app/node_modules/linked/index.d.ts,/app/node_modules/linked2/index.d.ts
export { real } from "real";
export class C { private x; }

// @filename: /app/node_modules/real/index.d.ts
export const real: string;

// @filename: /app/app.ts
// We shouldn't resolve symlinks for references either. See the trace.
/// <reference types="linked" />

import { C as C1 } from "linked";
import { C as C2 } from "linked2";

let x = new C1();
// Should fail. We no longer resolve any symlinks.
x = new C2();
