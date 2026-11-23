// @module: nodenext
// @moduleResolution: nodenext
// @noEmit: true

// @Filename: /package.json
{ "type": "module" }

// @Filename: /foo.ts
export {};

// @Filename: /foo/index.ts
export {};

// @Filename: /index.ts
import "./foo/";
