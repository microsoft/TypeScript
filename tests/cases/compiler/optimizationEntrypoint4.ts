// @module: amd
// @outFile: bundled.js
// @optimizationEntrypoint: tests/cases/compiler/index.ts
// @declaration: true

// @Filename: index.ts
import Foo = require("./foo");

export class Bar {
	field2: typeof Foo.field;
}

// @Filename: foo.ts

class Foo {
	static field: {name: string}
}

namespace Foo {}

export = Foo;