//// [tests/cases/compiler/unusedLocalProperty.ts] ////

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
class Animal {
    species;
    constructor(species) {
        this.species = species;
    }
    printSpecies() {
        let { species } = this;
        console.log(species);
    }
}
