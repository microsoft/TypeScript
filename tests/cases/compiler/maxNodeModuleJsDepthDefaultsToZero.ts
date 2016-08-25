// @module: commonjs
// @moduleResolution: node
// @allowJs: true
// @traceResolution: true
// @noEmit: true

// @filename: c:/root/tsconfig.json
{
    "compileOnSave": true,
    "compilerOptions": {
        "module": "commonjs",
        "moduleResolution": "node",
        "outDir": "bin"
    },
    "exclude": [ "node_modules" ]
}
// @filename: c:/root/node_modules/shortid/node_modules/z/index.js
// z will not be found because maxNodeModulesJsDepth: 0
module.exports = { z: 'no' };

// @filename: c:/root/node_modules/shortid/index.js
var z = require('z');
var y = { y: 'foo' };
module.exports = y;

// @filename: c:/root/typings/index.d.ts
declare module "shortid" {
    export var x: number;
}

// @filename: c:/root/index.ts
/// <reference path="c:/root/typings/index.d.ts" />
import * as foo from "shortid";
foo.x // found in index.d.ts
foo.y // ignored from shortid/index.ts

