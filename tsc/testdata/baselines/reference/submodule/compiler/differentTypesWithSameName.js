//// [tests/cases/compiler/differentTypesWithSameName.ts] ////

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
    class variable {
        s;
    }
    m.variable = variable;
    function doSomething(v) {
    }
    m.doSomething = doSomething;
})(m || (m = {}));
class variable {
    t;
}
var v = new variable();
m.doSomething(v);
