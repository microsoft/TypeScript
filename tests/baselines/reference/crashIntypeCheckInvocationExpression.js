//// [tests/cases/compiler/crashIntypeCheckInvocationExpression.ts] ////

//// [crashIntypeCheckInvocationExpression.ts]
var nake;
function doCompile<P0, P1, P2>(fileset: P0, moduleType: P1) {

    return undefined;
}
export var compileServer = task<number, number, any>(<P0, P1, P2>() => {

    var folder = path.join(),
        fileset = nake.fileSetSync<number, number, any>(folder)
  return doCompile<number, number, any>(fileset, moduleType);
});


//// [crashIntypeCheckInvocationExpression.js]
<<<<<<< HEAD
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.compileServer = void 0;
    var nake;
    function doCompile(fileset, moduleType) {
        return undefined;
    }
    exports.compileServer = task(() => {
        var folder = path.join(), fileset = nake.fileSetSync(folder);
        return doCompile(fileset, moduleType);
    });
||||||| parent of 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.compileServer = void 0;
    var nake;
    function doCompile(fileset, moduleType) {
        return undefined;
    }
    exports.compileServer = task(function () {
        var folder = path.join(), fileset = nake.fileSetSync(folder);
        return doCompile(fileset, moduleType);
    });
=======
var nake;
function doCompile(fileset, moduleType) {
    return undefined;
}
export var compileServer = task(function () {
    var folder = path.join(), fileset = nake.fileSetSync(folder);
    return doCompile(fileset, moduleType);
>>>>>>> 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
});
