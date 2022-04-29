///<reference path="decl.d.ts" />
import decl = require("decl");
var str = decl.call();

declare function fail();

if(str !== "success") {
    fail();
}