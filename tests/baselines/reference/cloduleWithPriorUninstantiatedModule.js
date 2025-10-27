//// [tests/cases/compiler/cloduleWithPriorUninstantiatedModule.ts] ////

//// [cloduleWithPriorUninstantiatedModule.ts]
// Non-ambient & uninstantiated module.
namespace Moclodule {
    export interface Someinterface {
        foo(): void;
    }
}

class Moclodule {
}

// Instantiated module.
namespace Moclodule {
    export class Manager {
    }
}

//// [cloduleWithPriorUninstantiatedModule.js]
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
