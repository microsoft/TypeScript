//// [tests/cases/conformance/classes/propertyMemberDeclarations/propertyOverridesAccessors4.ts] ////

//// [propertyOverridesAccessors4.ts]
declare class Animal {
    get sound(): string
    set sound(val: string)
}
class Lion extends Animal {
    sound = 'RAWR!' // error here
}


//// [propertyOverridesAccessors4.js]
class Lion extends Animal {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "sound", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'RAWR!'
        }); // error here
    }
}
