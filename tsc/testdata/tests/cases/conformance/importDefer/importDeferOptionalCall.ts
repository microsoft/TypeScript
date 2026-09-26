// @module: esnext

// @filename: x.ts
export const x = 1;

// @filename: b.ts
import.defer?.("./x");

// @filename: c.ts
import.defer?.<string>("./x");

// @filename: d.ts
import.defer("./x");
