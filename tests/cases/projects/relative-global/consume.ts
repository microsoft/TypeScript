import decl = require("./decl");
var str = decl.call();

declare function fail();

if(str !== "success") {
    fail();
}