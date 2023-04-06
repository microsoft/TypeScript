// @allowJs: true
// @checkJs: true
// @declaration: true
// @emitDeclarationOnly: true
// @outDir: ./out/
// @filename: Foo.js
class Base {
  static foo = "";
}
export class Foo extends Base {}
Foo.foo = "foo";

// @filename: Bar.ts
import { Foo } from "./Foo.js";

class Bar extends Foo {}
Bar.foo = "foo";
