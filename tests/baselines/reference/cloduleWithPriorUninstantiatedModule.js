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
"use strict";
class Moclodule {
}
// Instantiated module.
(function (Moclodule) {
    class Manager {
    }
    Moclodule.Manager = Manager;
})(Moclodule || (Moclodule = {}));
