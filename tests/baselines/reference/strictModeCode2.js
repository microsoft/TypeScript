//// [strictModeCode2.ts]
let let = 10;

function foo() {
    "use strict"
    var public = 10;
    var static = "hi";
    let let = "blah";
    var package = "hello"
    function package() { }
    function bar(private, implements, let) { }
    function baz<implements, protected>() { }
    function barn(cb: (private, public, package) => void) { }
    barn((private, public, package) => { });

    var myClass = class package extends public {}
}



//// [strictModeCode2.js]
var let = 10;
function foo() {
    "use strict";
    var public = 10;
    var static = "hi";
    var let = "blah";
    var package = "hello";
    function package() { }
    function bar(private, implements, let) { }
    function baz() { }
    function barn(cb) { }
    barn(function (private, public, package) { });
    var myClass = (function (_super) {
        __extends(package, _super);
        function package() {
            _super.apply(this, arguments);
        }
        return package;
    })(public);
}
