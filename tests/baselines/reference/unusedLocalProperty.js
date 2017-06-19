//// [unusedLocalProperty.ts]
declare var console: { log(msg: any): void; }
class Animal {
    constructor(private species: string) {
    }

    printSpecies() {
        let { species } = this;
        console.log(species);
    }
}



//// [unusedLocalProperty.js]
var Animal = /** @class */ (function () {
    function Animal(species) {
        this.species = species;
    }
    Animal.prototype.printSpecies = function () {
        var species = this.species;
        console.log(species);
    };
    return Animal;
}());
