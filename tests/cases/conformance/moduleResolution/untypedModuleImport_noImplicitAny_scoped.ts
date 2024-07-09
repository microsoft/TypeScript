// @noImplicitReferences: true
// @noImplicitAny: true

// @filename: /node_modules/@foo/bar/package.json
{ "name": "@foo/bar", "version": "1.2.3" }

// @filename: /node_modules/@foo/bar/index.js
This file is not processed.

// @filename: /a.ts
import * as foo from "@foo/bar";
