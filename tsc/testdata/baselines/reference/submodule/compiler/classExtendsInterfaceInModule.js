//// [tests/cases/compiler/classExtendsInterfaceInModule.ts] ////

//// [classExtendsInterfaceInModule.ts]
module M {
  export interface I1 {}
  export interface I2<T> {}
}
class C1 extends M.I1 {}
class C2<T> extends M.I2<T> {}

module Mod {
	export namespace Nested {
		export interface I {}
	}
}

class D extends Mod.Nested.I {}


//// [classExtendsInterfaceInModule.js]
class C1 extends M.I1 {
}
class C2 extends M.I2 {
}
class D extends Mod.Nested.I {
}
