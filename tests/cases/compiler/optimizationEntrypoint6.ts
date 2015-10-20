// @module: amd
// @outFile: bundled.js
// @optimizationEntrypoint: tests/cases/compiler/main.ts
// @declaration: true

// @Filename: typings/foo/index.d.ts
declare module "foo" {
	export class Dependency {}
}

// @Filename: typings/bar/index.d.ts
declare module "bar" {
	export class Dependency {}
}

// @Filename: main.ts
export * from "./interop/index";
export default 2+2;
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
