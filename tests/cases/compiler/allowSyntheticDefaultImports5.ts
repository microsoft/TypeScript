// @module: system
// @Filename: b.d.ts
declare class Foo {
	member: string;
}
export = Foo;

// @Filename: a.ts
import Foo from "./b";
export var x = new Foo();
