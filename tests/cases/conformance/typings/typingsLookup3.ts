// @traceResolution: true
// @noImplicitReferences: true
// @currentDirectory: /
// This tests that `types` references are automatically lowercased.

// @filename: /tsconfig.json
{ "files": "a.ts" }

// @filename: /node_modules/@types/jquery/index.d.ts
declare var $: { x: any };

// @filename: /a.ts
/// <reference types="JqUeRy" />
$.x;
