// @noImplicitReferences: true
// @strict: true

// @Filename: /node_modules/@types/foo/index.d.ts
export const foo: number;

// @Filename: /node_modules/@types/foo/package.json
{ "name": "@types/foo", "version": "1.2.3" }

// @Filename: /node_modules/foo/sub.js
const x = 0;

// @Filename: /node_modules/foo/package.json
{ "name": "foo", "version": "1.2.3" }

// @Filename: /node_modules/bar/sub.js
const x = 0;

// @Filename: /node_modules/bar/package.json
{ "name": "bar", "version": "1.2.3" }

// @Filename: /node_modules/@types/scope__foo/index.d.ts
export const foo: number;

// @Filename: /node_modules/@types/scope__foo/package.json
{ "name": "@types/scope__foo", "version": "1.2.3" }

// @Filename: /node_modules/@scope/foo/sub.js
const x = 0;

// @Filename: /node_modules/@scope/foo/package.json
{ "name": "@scope/foo", "version": "1.2.3" }

// @Filename: /node_modules/@scope/bar/sub.js
const x = 0;

// @Filename: /node_modules/@scope/bar/package.json
{ "name": "@scope/bar", "version": "1.2.3" }

// @Filename: /a.ts
import * as foo from "foo";
import * as fooSub from "foo/sub";
import * as barSub from "bar/sub";
import * as scopeFoo from "@scope/foo";
import * as scopeFooSub from "@scope/foo/sub";
import * as scopeBarSub from "@scope/bar/sub";
