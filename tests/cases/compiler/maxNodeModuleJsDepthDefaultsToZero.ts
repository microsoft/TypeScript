// @module: commonjs
// @moduleResolution: node
// @allowJs: true
// @traceResolution: true
// @noEmit: true

// @filename: /tsconfig.json
{
    "compileOnSave": true,
    "compilerOptions": {
        "module": "commonjs",
        "moduleResolution": "node",
        "outDir": "bin"
    }
}
// @filename: /node_modules/shortid/node_modules/z/index.js
// z will not be found because maxNodeModulesJsDepth: 0
module.exports = { z: 'no' };

// @filename: /node_modules/shortid/index.js
var z = require('z');
var y = { y: 'foo' };
module.exports = y;

// @filename: /typings/index.d.ts
declare module "shortid" {
    export var x: number;
}

// @filename: /index.ts
/// <reference path="/typings/index.d.ts" />
import * as foo from "shortid";
foo.x // found in index.d.ts
foo.y // ignored from shortid/index.js

