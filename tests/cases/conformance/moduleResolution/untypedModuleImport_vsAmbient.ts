// @noImplicitReferences: true
// @currentDirectory: /
// This tests that an ambient module declaration overrides an untyped import.

// @filename: /node_modules/foo/index.js
This file is not processed.

// @filename: /declarations.d.ts
declare module "foo" {
    export const x: number;
}

// @filename: /a.ts
/// <reference path="./declarations.d.ts" />
import { x } from "foo";
x;
