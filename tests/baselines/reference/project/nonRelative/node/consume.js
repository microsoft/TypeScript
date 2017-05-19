"use strict";
exports.__esModule = true;
var mod = require("decl");
var x = require("lib/foo/a");
var y = require("lib/bar/a");
x.hello();
y.hello();
var str = mod.call();
if (str !== "success") {
    fail();
}
