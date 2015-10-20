// @module: amd
// @outFile: bundled.js
// @optimizationEntrypoint: tests/cases/compiler/index.ts
// @declaration: true
// @Filename: index.ts
export * from "./interop/index";
export default 2+2;

// @Filename: interop/index.ts
export * from "./foo";
export * from "./bar";

// @Filename: interop/foo.ts
import {Dependency} from "foo";

export class FooDependency extends Dependency {}

// @Filename: interop/bar.ts
import {Dependency} from "bar";

export class BarDependency extends Dependency {}

// @Filename: typings/foo/index.d.ts
declare module "foo" {
	export class Dependency {}
}

// @Filename: typings/bar/index.d.ts
declare module "bar" {
	export class Dependency {}
}