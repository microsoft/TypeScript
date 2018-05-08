// @lib: es5
// @noUnusedLocals:true
declare var console: { log(msg: any): void; }
class Animal {
    constructor(private species: string) {
    }

    printSpecies() {
        let { species } = this;
        console.log(species);
    }
}

