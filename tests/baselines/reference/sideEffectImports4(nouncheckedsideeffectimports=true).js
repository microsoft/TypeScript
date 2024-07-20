//// [tests/cases/compiler/sideEffectImports4.ts] ////

//// [package.json]
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

//// [index.js]
throw new Error();

//// [empty.js]
// Empty

//// [package.json]
{
    "name": "root",
    "type": "module"
}

//// [index.ts]
import "server-only";


//// [index.js]
import "server-only";
