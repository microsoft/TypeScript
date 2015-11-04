// @module: amd
// @outFile: bundled.js
// @optimizationEntrypoint: tests/cases/compiler/index.ts
// @declaration: true

// @Filename: index.ts
import * as t from "./foo";

export = t;

// @Filename: foo.ts
export * from "./bar";

export class Foo<T> extends Array<T> {
	self: this;
}

// @Filename: bar.ts

import {Foo} from "./foo";

export class Bar extends Foo<Foo<number>> {
	primary: Foo<number>;
}