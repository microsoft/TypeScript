// @module: commonjs
// @esModuleInterop: true
// @filename: mod.ts
export default class Foo {}
export class Bar {}
// @filename: idx.ts
import Foo from "./mod";
import { default as Foo2 } from "./mod";
import { Bar, default as Foo3 } from "./mod";
new Foo();
new Foo2();
new Bar();
new Foo3();