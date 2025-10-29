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