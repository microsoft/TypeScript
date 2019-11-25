//// [tests/cases/compiler/requireOfJsonFileWithModuleNodeResolutionEmitAmd.ts] ////

//// [file1.ts]
import * as b from './b.json';

//// [b.json]
{
    "a": true,
    "b": "hello"
}

//// [out/b.json]
{
    "a": true,
    "b": "hello"
}
//// [out/file1.js]
define(["require", "exports", "./b.json"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
