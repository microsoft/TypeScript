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
var Animal = (function () {
    function Animal(species) {
        this.species = species;
    }
    var proto_1 = Animal.prototype;
    proto_1.printSpecies = function () {
        var species = this.species;
        console.log(species);
    };
    return Animal;
}());
