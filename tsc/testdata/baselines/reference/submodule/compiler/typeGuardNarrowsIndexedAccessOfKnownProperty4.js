//// [tests/cases/compiler/typeGuardNarrowsIndexedAccessOfKnownProperty4.ts] ////

//// [typeGuardNarrowsIndexedAccessOfKnownProperty4.ts]
class Foo {
    x: number | undefined;

    constructor() {
        this.x = 5;

        this.x;    // number
        this['x']; // number

        const key = 'x';
        this[key]; // number
    }
}


//// [typeGuardNarrowsIndexedAccessOfKnownProperty4.js]
class Foo {
    x;
    constructor() {
        this.x = 5;
        this.x;
        this['x'];
        const key = 'x';
        this[key];
    }
}
