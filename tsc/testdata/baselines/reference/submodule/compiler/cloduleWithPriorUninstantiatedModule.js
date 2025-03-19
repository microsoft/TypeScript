//// [tests/cases/compiler/cloduleWithPriorUninstantiatedModule.ts] ////

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
class Moclodule {
}
// Instantiated module.
(function (Moclodule) {
    class Manager {
    }
    Moclodule.Manager = Manager;
})(Moclodule || (Moclodule = {}));
