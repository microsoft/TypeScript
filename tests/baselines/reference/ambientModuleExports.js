//// [ambientModuleExports.ts]
declare module Foo {
	function a():void;
	var b:number;
	class C {}
}

Foo.a();
Foo.b;
var c = new Foo.C();

declare module Foo2 {
    export function a(): void;
    export var b: number;
    export class C { }
}

Foo2.a();
Foo2.b;
var c2 = new Foo2.C();

//// [ambientModuleExports.js]
Foo.a();
Foo.b;
var c = new Foo.C();
Foo2.a();
Foo2.b;
var c2 = new Foo2.C();
