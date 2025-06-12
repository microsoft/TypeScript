//// [tests/cases/compiler/unusedMultipleParameter1InContructor.ts] ////

//// [unusedMultipleParameter1InContructor.ts]
class Dummy {
    constructor(person: string, person2: string) {
        var unused = 20;
        person2 = "Dummy value";
    }
}

//// [unusedMultipleParameter1InContructor.js]
class Dummy {
    constructor(person, person2) {
        var unused = 20;
        person2 = "Dummy value";
    }
}
