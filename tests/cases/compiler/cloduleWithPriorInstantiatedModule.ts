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