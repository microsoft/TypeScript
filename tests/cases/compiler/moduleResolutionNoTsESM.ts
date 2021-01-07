// ESM output
// @module: es2015

// @jsx: Preserve
// @filename: x.ts
export default 0;

// @filename: y.tsx
export default 0;

// @filename: z.d.ts
declare const x: number;
export default x;

// @filename: user.ts
import x from "./x.ts";
import y from "./y.tsx";
import z from "./z.d.ts";

// Making sure the suggested fixes are valid:
import x2 from "./x";
import y2 from "./y";
import z2 from "./z";
