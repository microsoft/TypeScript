//// [tests/cases/compiler/cloduleWithPriorInstantiatedModule.ts] ////

//// [cloduleWithPriorInstantiatedModule.ts]
// Non-ambient & instantiated module.
module Moclodule {
    export interface Someinterface {
        foo(): void;
    }
    var x = 10;
}

class Moclodule {
}

// Instantiated module.
module Moclodule {
    export class Manager {
    }
}

//// [cloduleWithPriorInstantiatedModule.js]
// Non-ambient & instantiated module.
var Moclodule;
(function (Moclodule) {
    var x = 10;
})(Moclodule || (Moclodule = {}));
var Moclodule = /** @class */ (function () {
    function Moclodule() {
    }
    return Moclodule;
}());
// Instantiated module.
(function (Moclodule) {
    var Manager = /** @class */ (function () {
        function Manager() {
        }
        return Manager;
    }());
    Moclodule.Manager = Manager;
})(Moclodule || (Moclodule = {}));
