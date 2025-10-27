// Non-ambient & instantiated module.
namespace Moclodule {
    export interface Someinterface {
        foo(): void;
    }
    var x = 10;
}

class Moclodule {
}

// Instantiated module.
namespace Moclodule {
    export class Manager {
    }
}