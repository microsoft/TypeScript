import mod = require("decl");
import x = require("lib/foo/a");
import y = require("lib/bar/a");

x.hello();
y.hello();

var str = mod.call();


declare function fail();
if(str !== "success") {
    fail();
}