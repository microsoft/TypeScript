//// [a.js]
function foo(name) {
    var s = require("t/" + name)
}

//// [a_out.js]
function foo(name) {
    var s = require("t/" + name);
}
