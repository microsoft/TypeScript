// @noImplicitReferences: true
// @currentDirectory: /
// This tests that augmenting an untyped module is forbidden.

// @filename: /node_modules/foo/index.js
This file is not processed.

// @filename: /a.ts
declare module "foo" {
    export const x: number;
}
import { x } from "foo";
x;
