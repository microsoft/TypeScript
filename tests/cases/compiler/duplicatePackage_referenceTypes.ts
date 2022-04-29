// @noImplicitReferences: true

// @Filename: /node_modules/a/index.d.ts
/// <reference types="foo" />
import { Foo } from "foo";
export const foo: Foo;

// @Filename: /node_modules/a/node_modules/foo/index.d.ts
export class Foo { private x; }

// @Filename: /node_modules/a/node_modules/foo/package.json
{ "name": "foo", "version": "1.2.3" }

// @Filename: /node_modules/@types/foo/index.d.ts
export class Foo { private x; }

// @Filename: /node_modules/@types/foo/package.json
{ "name": "foo", "version": "1.2.3" }

// @Filename: /index.ts
import * as a from "a";
import { Foo } from "foo";

let foo: Foo = a.foo;
