// @noImplicitReferences: true
// @currentDirectory: /
// This tests that untyped module imports don't happen with local imports.

// @filename: /foo.js
This file is not processed.

// @filename: /a.ts
import * as foo from "./foo";
