// @module: commonjs

namespace foo {    
    export class Provide {
    }

    export namespace bar { export namespace baz {export class boo {}}}
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
