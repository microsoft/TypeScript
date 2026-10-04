//// [tests/cases/compiler/esModuleInteropEnablesSyntheticDefaultImports.ts] ////

//// [a.ts]
import Namespace from "./b";
export var x = new Namespace.Foo();

//// [b.d.ts]
export class Foo {
	member: string;
}


//// [a.js]
import Namespace from "./b";
export var x = new Namespace.Foo();
