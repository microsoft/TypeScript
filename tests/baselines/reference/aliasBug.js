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
var foo;
(function (foo) {
    var Provide = (function () {
        function Provide() {
        }
        return Provide;
    })();
    foo.Provide = Provide;
    (function (bar) {
        (function (baz) {
            var boo = (function () {
                function boo() {
                }
                return boo;
            })();
            baz.boo = boo;
        })(bar.baz || (bar.baz = {}));
        var baz = bar.baz;
    })(foo.bar || (foo.bar = {}));
    var bar = foo.bar;
})(foo || (foo = {}));
var provide = foo;
var booz = foo.bar.baz;
var p = new provide.Provide();
function use() {
    var p1; // error here, but should be okay
    var p2;
    var p3;
    var p22 = new provide.Provide();
}
