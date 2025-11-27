// @declaration: true

// @Filename: A.ts
namespace A { export interface I {} }

// @Filename: B.ts
///<reference path="A.ts" preserve="true" />
namespace A { ; }
namespace B {
	export function f(): A.I { return null; }
}

