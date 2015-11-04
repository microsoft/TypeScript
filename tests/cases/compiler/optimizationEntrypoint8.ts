// @module: amd
// @moduleResolution: node
// @outFile: bundled.js
// @optimizationEntrypoint: tests/cases/compiler/main.ts
// @declaration: true

// @Filename: node_modules/foo/index.d.ts
declare class Foo {}
declare namespace Foo {
	export interface Bar {
		member: number;
	}
}
export = Foo;


// @Filename: main.ts
import * as Foo from "foo";
export class Baz extends Foo implements Foo.Bar {
	member = 42;
}

