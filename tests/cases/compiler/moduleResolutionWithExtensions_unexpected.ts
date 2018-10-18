// @noImplicitReferences: true
// @traceResolution: true
// This tests that a package.json "main" with an unexpected extension is ignored.

// @Filename: /node_modules/normalize.css/normalize.css
This file is not read.

// @Filename: /node_modules/normalize.css/package.json
{ "main": "normalize.css" }

// @Filename: /a.ts
import "normalize.css";
