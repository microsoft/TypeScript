// @declaration: true

// @Filename: A.ts
module A { export interface I {} }

// @Filename: B.ts
///<reference path="A.ts" preserve="true" />
module A { ; }
module B {
	export function f(): A.I { return null; }
}

