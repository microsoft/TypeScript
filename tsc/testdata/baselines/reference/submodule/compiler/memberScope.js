//// [tests/cases/compiler/memberScope.ts] ////

//// [memberScope.ts]
namespace Salt {
  export class Pepper {}
  export namespace Basil { }
  var z = Basil.Pepper;
}



//// [memberScope.js]
"use strict";
var Salt;
(function (Salt) {
    class Pepper {
    }
    Salt.Pepper = Pepper;
    var z = Basil.Pepper;
})(Salt || (Salt = {}));
