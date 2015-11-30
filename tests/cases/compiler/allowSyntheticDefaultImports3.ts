// @allowSyntheticDefaultImports: false
// @module: system
// @Filename: a.ts
import Namespace from "./b";
export var x = new Namespace.Foo();

// @Filename: b.ts
export class Foo {
	member: string;
}
