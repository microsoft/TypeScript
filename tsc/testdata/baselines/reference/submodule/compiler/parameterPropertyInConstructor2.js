//// [tests/cases/compiler/parameterPropertyInConstructor2.ts] ////

//// [parameterPropertyInConstructor2.ts]
namespace mod {
  class Customers {
    constructor(public names: string);
    constructor(public names: string, public ages: number) {
    }
  }
}


//// [parameterPropertyInConstructor2.js]
"use strict";
var mod;
(function (mod) {
    class Customers {
        names;
        ages;
        constructor(names, ages) {
            this.names = names;
            this.ages = ages;
        }
    }
})(mod || (mod = {}));
