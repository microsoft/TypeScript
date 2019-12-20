//// [tests/cases/compiler/requireOfJsonFileWithoutResolveJsonModuleAndPathMapping.ts] ////

//// [foobar.json]
{ "a": 10 }

//// [a.ts]
import foobar from "foo/bar/foobar.json";


//// [/bin/a.js]
"use strict";
exports.__esModule = true;
