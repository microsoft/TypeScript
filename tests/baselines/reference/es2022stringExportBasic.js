//// [tests/cases/compiler/es2022stringExportBasic.ts] ////

//// [lib.d.ts]
declare const item: string;
export { item as "non-ident" };

//// [app.ts]
import { "non-ident" as str } from "./lib"
str


//// [app.js]
import { "non-ident" as str } from "./lib";
str;
