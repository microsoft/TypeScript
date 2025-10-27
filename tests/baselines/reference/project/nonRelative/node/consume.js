"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mod = require("decl");
const x = require("lib/foo/a");
const y = require("lib/bar/a");
x.hello();
y.hello();
var str = mod.call();
if (str !== "success") {
    fail();
}
