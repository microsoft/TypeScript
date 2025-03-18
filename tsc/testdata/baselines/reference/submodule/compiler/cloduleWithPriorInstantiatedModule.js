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
var Moclodule;
(function (Moclodule) {
    var x = 10;
})(Moclodule || (Moclodule = {}));
class Moclodule {
}
(function (Moclodule) {
    class Manager {
    }
    Moclodule.Manager = Manager;
})(Moclodule || (Moclodule = {}));
