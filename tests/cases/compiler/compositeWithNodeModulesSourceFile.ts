// @filename: /foo/tsconfig.json
{
    "compilerOptions": { "composite": true }
}

// @filename: /foo/node_modules/myModule/index.ts
export class c { }

// @filename: /foo/test.ts
import myModule = require("myModule");
new myModule.c();

