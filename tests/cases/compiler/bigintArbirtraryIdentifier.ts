// @target: esnext
// @module: esnext

// @filename: foo.ts
const foo = 0n;
export { foo as "0n" };

// @filename: correctUse.ts
import { "0n" as foo } from "./foo";
export { foo as "0n" };

// @filename: badImport.ts
import { 0n as foo } from "./foo";

// @filename: badImport2.ts
import { foo as 0n } from "./foo";

// @filename: badExport.ts
export { foo as 0n };

// @filename: badExport2.ts
export { 0n as foo };