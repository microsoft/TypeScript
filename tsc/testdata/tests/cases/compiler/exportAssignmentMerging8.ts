// @module: commonjs
// @declaration: true
// @filename: a.ts
type SomeTypeAlias = { x: string };
class Foo {}
export = Foo;
export { SomeTypeAlias };
// @filename: b.ts
import { SomeTypeAlias } from "./a";
const value: SomeTypeAlias = { x: "ok" };

