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