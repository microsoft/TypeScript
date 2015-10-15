// @module: amd
// @outFile: bundled.js
// @optimizationEntrypoint: tests/cases/compiler/index.ts
// @declaration: true

// @Filename: index.ts
import * as foo from "./foo";
export * from "./foo";

export class Main {
	a: foo.A;
	b: [foo.B];
	c: (foo.C);
	d: foo.D[];
	e: foo.E | foo.E2;
	f: foo.F & foo.F2;
	g: foo.GAlias;
	h: {item: foo.H};
	i: foo.IAlias;
	j: foo.J<number>;
	jj: foo.AnyJ;
}

// @Filename: foo.ts

export class A {}
export class B {}
export class C {}
export class D {}
export class E {}
export class F {}
export class E2 {}
export class F2 {}
export class G {}
export type GAlias = G | A;
export class H {}
export class I {}
export type IAlias = I;
export class J<T> {}
export type AnyJ = J<any>;
