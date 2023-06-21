// @module: esnext
// @filename: lib.d.ts
declare const item: string;
export { item as "non-ident" };

// @filename: app.ts
import { "non-ident" as str } from "./lib"
str
