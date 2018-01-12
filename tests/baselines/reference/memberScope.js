//// [memberScope.ts]
module Salt {
  export class Pepper {}
  export module Basil { }
  var z = Basil.Pepper;
}



//// [memberScope.js]
var Salt;
(function (Salt) {
    var Pepper = /** @class */ (function () {
        function Pepper() {
        }
        return Pepper;
    }());
    Salt.Pepper = Pepper;
    var z = Basil.Pepper;
})(Salt || (Salt = {}));
