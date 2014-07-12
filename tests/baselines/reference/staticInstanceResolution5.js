//// [staticInstanceResolution5_1.js]
define(["require", "exports"], function(require, exports) {
    // these 3 should be errors
    var x = function (w1) {
    };
    var y = function (w2) {
    };
    function z(w3) {
    }
});
