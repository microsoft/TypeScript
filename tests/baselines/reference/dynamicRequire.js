//// [a.js]
function foo(name) {
    var s = require("t/" + name)
}

//// [a_out.js]
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    function foo(name) {
        var s = require("t/" + name);
    }
});
