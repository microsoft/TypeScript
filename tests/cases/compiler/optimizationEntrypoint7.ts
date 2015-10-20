// @module: amd
// @moduleResolution: node
// @outFile: bundled.js
// @optimizationEntrypoint: tests/cases/compiler/main.ts
// @declaration: true

// @Filename: node_modules/foo/index.d.ts
export class Dependency {}

// @Filename: node_modules/bar/index.d.ts
export class Dependency {}

// @Filename: main.ts
export * from "./interop";
export class Baz {}

// @Filename: interop/index.ts
export * from "./foodep";
export * from "./bardep";

// @Filename: interop/foodep.ts
import {Dependency} from "foo";

export class FooDependency extends Dependency {}

// @Filename: interop/bardep.ts
import {Dependency} from "bar";

export class BarDependency extends Dependency {}
