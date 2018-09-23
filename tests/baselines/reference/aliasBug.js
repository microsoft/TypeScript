//// [aliasBug.ts]
module foo {    
    export class Provide {
    }

    export module bar { export module baz {export class boo {}}}
}

import provide = foo;
import booz = foo.bar.baz;

var p = new provide.Provide();

function use() {
  var p1: provide.Provide; // error here, but should be okay
  var p2: foo.Provide;
  var p3:booz.bar;
  var p22 = new provide.Provide();
}


//// [aliasBug.js]
var foo = foo || (foo = {});
(function (foo) {
    var Provide = /** @class */ (function () {
        function Provide() {
        }
        return Provide;
    }());
    foo.Provide = Provide;
    var bar = foo.bar || (foo.bar = {});
    (function (bar) {
        var baz = bar.baz || (bar.baz = {});
        (function (baz) {
            var boo = /** @class */ (function () {
                function boo() {
                }
                return boo;
            }());
            baz.boo = boo;
        })(baz);
    })(bar);
})(foo);
var provide = foo;
var booz = foo.bar.baz;
var p = new provide.Provide();
function use() {
    var p1; // error here, but should be okay
    var p2;
    var p3;
    var p22 = new provide.Provide();
}
