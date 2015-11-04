// @module: amd
// @outFile: bundled.js
// @optimizationEntrypoint: tests/cases/compiler/index.ts
// @declaration: true

// @Filename: index.ts
import {Foo} from "./foo";

class Bar extends Foo<Foo<number>> {
	primary: Foo<number>;
}

export = Bar;

// @Filename: foo.ts

export class Foo<T> extends Array<T> {
	self: this;
}
