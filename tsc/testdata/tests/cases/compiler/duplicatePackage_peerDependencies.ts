// @module: node16
// @target: es2015
// @noImplicitReferences: true
// @traceResolution: true

// Package "foo" has peerDependencies on "peer-a" and "peer-b".
// Two copies exist (under a/node_modules and b/node_modules).
// The peer dependency fields have the names in different orders in each copy's package.json.
// They should be deduplicated because they share the same name, version, and peer dependency versions.

// @Filename: /node_modules/a/index.d.ts
export { Foo } from "foo";

// @Filename: /node_modules/a/node_modules/foo/index.d.ts
export class Foo { private x; }

// @Filename: /node_modules/a/node_modules/foo/package.json
{ "name": "foo", "version": "1.0.0", "peerDependencies": { "peer-b": "*", "peer-a": "*" } }
// @Filename: /node_modules/a/node_modules/peer-a/index.d.ts
export const a: string;
// @Filename: /node_modules/a/node_modules/peer-a/package.json
{ "name": "peer-a", "version": "2.0.0" }
// @Filename: /node_modules/a/node_modules/peer-b/index.d.ts
export const b: string;
// @Filename: /node_modules/a/node_modules/peer-b/package.json
{ "name": "peer-b", "version": "3.0.0" }

// @Filename: /node_modules/b/index.d.ts
export { Foo } from "foo";

// @Filename: /node_modules/b/node_modules/foo/index.d.ts
export class Foo { private x; }

// @Filename: /node_modules/b/node_modules/foo/package.json
{ "name": "foo", "version": "1.0.0", "peerDependencies": { "peer-a": "*", "peer-b": "*" } }
// @Filename: /node_modules/b/node_modules/peer-a/index.d.ts
export const a: string;
// @Filename: /node_modules/b/node_modules/peer-a/package.json
{ "name": "peer-a", "version": "2.0.0" }
// @Filename: /node_modules/b/node_modules/peer-b/index.d.ts
export const b: string;
// @Filename: /node_modules/b/node_modules/peer-b/package.json
{ "name": "peer-b", "version": "3.0.0" }

// @Filename: /src/a.ts
import { Foo as FooA } from "a";
import { Foo as FooB } from "b";

// Both should be the same type because the packages are deduplicated.
let x: FooA = new FooB();
let y: FooB = new FooA();
