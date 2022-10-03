//// [tests/cases/compiler/requireOfJsonFileWithModuleNodeResolutionEmitAmdOutFile.ts] ////

//// [file1.ts]
import * as b from './b.json';

//// [b.json]
{
    "a": true,
    "b": "hello"
}

//// [out/output.js]
define("b", [], {
    "a": true,
    "b": "hello"
});
define("file1", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
