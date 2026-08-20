// @module: commonjs
// @target: es2015
// @filename: /foo/tsconfig.json
{
    "compilerOptions": { "composite": true, "target": "es2015", "module": "commonjs" }
}

// @filename: /foo/node_modules/myModule/index.ts
export class c { }

// @filename: /foo/test.ts
import myModule = require("myModule");
new myModule.c();

