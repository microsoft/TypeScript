"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mod = require("decl");
var x = require("lib/foo/a");
var y = require("lib/bar/a");
x.hello();
y.hello();
var str = mod.call();
if (str !== "success") {
    fail();
}
