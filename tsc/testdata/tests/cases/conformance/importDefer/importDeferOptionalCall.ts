// @module: esnext

// @filename: x.ts
export const x = 1;

// @filename: b.ts
import.defer?.("./x");
import.defer?.<string>("./x");
import.defer("./x");
