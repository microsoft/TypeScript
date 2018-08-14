//// [tests/cases/compiler/requireOfJsonFileWithoutResolveJsonModuleAndPathMapping.ts] ////

//// [foobar.json]
{ "a": 10 }

//// [a.ts]
import foobar from "foo/bar/foobar.json";


//// [/bin/node_modules/foo/bar/foobar.json]
{ "a": 10 }
//// [/bin/a.js]
"use strict";
exports.__esModule = true;
