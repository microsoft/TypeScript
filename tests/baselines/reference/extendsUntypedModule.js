//// [tests/cases/compiler/extendsUntypedModule.ts] ////

//// [index.js]
This file is not read.

//// [index.js]
Nor is this one.

//// [a.ts]
import Foo from "foo";
import Bar from "bar"; // error: unused
export class A extends Foo { }


//// [a.js]
import Foo from "foo";
export class A extends Foo {
}
