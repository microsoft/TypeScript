// @esModuleInterop: true
// @importHelpers: true
// @noEmitHelpers: true
// @filename: refs.d.ts
declare module "path";
// @filename: file.ts
import path from "path";
path.resolve("", "../");
export class Foo { }
// @filename: file2.ts
import * as path from "path";
path.resolve("", "../");
export class Foo2 { }
// @filename: file3.ts
import {default as resolve} from "path";
resolve("", "../");
export class Foo3 { }
// @filename: file4.ts
import {Bar, default as resolve} from "path";
resolve("", "../");
export { Bar }