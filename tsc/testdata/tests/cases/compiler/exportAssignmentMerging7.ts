// @module: commonjs
// @declaration: true
// @filename: a.ts
class Foo {}
class Bar {}
export = Foo;
export { Bar }; // Causes error
// @filename: b.ts
import { Bar } from "./a";
const b = new Bar();

