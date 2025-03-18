//// [tests/cases/compiler/aliasBug.ts] ////

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
    class Provide {
    }
    foo.Provide = Provide;
    let bar;
    (function (bar) {
        let baz;
        (function (baz) {
            class boo {
            }
            baz.boo = boo;
        })(baz = bar.baz || (bar.baz = {}));
    })(bar = foo.bar || (foo.bar = {}));
})(foo || (foo = {}));
var p = new provide.Provide();
function use() {
    var p1;
    var p2;
    var p3;
    var p22 = new provide.Provide();
}
