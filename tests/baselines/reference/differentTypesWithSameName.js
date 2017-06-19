//// [differentTypesWithSameName.ts]
module m {
  export class variable{
    s: string;
  }
  export function doSomething(v: m.variable) {
    
  }
}

class variable {
 t: number;
}


var v: variable = new variable();
m.doSomething(v);

//// [differentTypesWithSameName.js]
var m;
(function (m) {
    var variable = /** @class */ (function () {
        function variable() {
        }
        return variable;
    }());
    m.variable = variable;
    function doSomething(v) {
    }
    m.doSomething = doSomething;
})(m || (m = {}));
var variable = /** @class */ (function () {
    function variable() {
    }
    return variable;
}());
var v = new variable();
m.doSomething(v);
