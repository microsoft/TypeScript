///<reference path="decl.d.ts" />
var decl = require("decl");
var str = decl.call();
if (str !== "success") {
    fail();
}
