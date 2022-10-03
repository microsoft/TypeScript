// @noImplicitReferences: true
// @noImplicitAny: true

// @filename: /node_modules/foo/package.json
{ "name": "foo", "version": "1.2.3" }

// @filename: /node_modules/foo/index.js
This file is not processed.

// @filename: /a.ts
import * as foo from "./node_modules/foo";
