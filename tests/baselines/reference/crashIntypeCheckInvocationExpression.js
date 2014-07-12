//// [crashIntypeCheckInvocationExpression.js]
define(["require", "exports"], function(require, exports) {
    var nake;
    function doCompile(fileset, moduleType) {
        return undefined;
    }
    exports.compileServer = task(function () {
        var folder = path.join(), fileset = nake.fileSetSync(folder);
        return doCompile(fileset, moduleType);
    });
});
