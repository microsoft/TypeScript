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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var Animal = (function () {
    function Animal(species) {
        this.species = species;
    }
    Animal.prototype.printSpecies = function () {
        var species = this.species;
        console.log(species);
    };
    __names(Animal.prototype, ["printSpecies"]);
    return Animal;
}());
