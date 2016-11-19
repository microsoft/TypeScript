//// [cloduleWithPriorUninstantiatedModule.ts]
// Non-ambient & uninstantiated module.
module Moclodule {
    export interface Someinterface {
        foo(): void;
    }
}

class Moclodule {
}

// Instantiated module.
module Moclodule {
    export class Manager {
    }
}

//// [cloduleWithPriorUninstantiatedModule.js]
var Moclodule = (function () {
    function Moclodule() {
    }
    return Moclodule;
}());
// Instantiated module.
(function (Moclodule) {
    var Manager = (function () {
        function Manager() {
        }
        return Manager;
    }());
    Moclodule.Manager = Manager;
})(Moclodule || (Moclodule = {}));
