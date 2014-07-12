//// [ambientExternalModuleInAnotherExternalModule.js]
define(["require", "exports", "ext"], function(require, exports, ext) {
    var D = (function () {
        function D() {
        }
        return D;
    })();
    

    var x = ext;
    return D;
});
