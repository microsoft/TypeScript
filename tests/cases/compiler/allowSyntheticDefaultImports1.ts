// @allowSyntheticDefaultImports: true
// @module: commonjs
// @Filename: a.ts
import Namespace from "./b";
export var x = new Namespace.Foo();

// @Filename: b.ts
export class Foo {
	member: string;
}
