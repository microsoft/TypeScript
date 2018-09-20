// @noImplicitReferences: true
// @traceResolution: true
// This tests that a package.json "types" with an unexpected extension is ignored.

// @Filename: /node_modules/foo/foo.js
This file is not read.

// @Filename: /node_modules/foo/package.json
{ "types": "foo.js" }

// @Filename: /a.ts
import "foo";
