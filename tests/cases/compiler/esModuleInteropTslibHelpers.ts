// @esModuleInterop: true
// @importHelpers: true
// @noEmitHelpers: true
// @filename: refs.d.ts
declare module "path";
// @filename: file.ts
import path from "path";
path.resolve("", "../");
export class Foo { }