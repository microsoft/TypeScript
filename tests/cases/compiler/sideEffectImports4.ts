// @noUncheckedSideEffectImports: true,false
// @strict: true
// @noImplicitReferences: true
// @module: esnext
// @moduleResolution: bundler
// @moduleDetection: force
// @allowJs: true
// @checkJs: true

// @filename: node_modules/server-only/package.json
{
  "name": "server-only",
  "version": "0.0.1",
  "main": "index.js",
  "exports": {
    ".": {
      "react-server": "./empty.js",
      "default": "./index.js"
    }
  }
}

// @filename: node_modules/server-only/index.js
throw new Error();

// @filename: node_modules/server-only/empty.js
// Empty

// @filename: package.json
{
    "name": "root",
    "type": "module"
}

// @filename: index.ts
import "server-only";
