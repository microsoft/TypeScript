//// [tests/cases/compiler/pathMappingBasedModuleResolution_withExtension_MapedToNodeModules.ts] ////

//// [foobar.js]
module.exports = { a: 10 };

//// [a.ts]
import foobar from "foo/bar/foobar.js";


//// [/bin/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
