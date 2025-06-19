//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsClassStatic2.ts] ////

//// [Foo.js]
class Base {
  static foo = "";
}
export class Foo extends Base {}
Foo.foo = "foo";

//// [Bar.ts]
import { Foo } from "./Foo.js";

class Bar extends Foo {}
Bar.foo = "foo";




//// [Foo.d.ts]
declare class Base {
    static foo: string;
}
export declare class Foo extends Base {
}
export {};
//// [Bar.d.ts]
export {};
