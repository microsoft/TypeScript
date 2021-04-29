//// [assertionFunctionsCanNarrowByDiscriminant.ts]
interface Cat {
    type: 'cat';
    canMeow: true;
}

interface Dog {
    type: 'dog';
    canBark: true;
}

type Animal = Cat | Dog;

declare function assertEqual<T>(value: any, type: T): asserts value is T;

const animal = { type: 'cat', canMeow: true } as Animal;
assertEqual(animal.type, 'cat' as const);

animal.canMeow; // since is cat, should not be an error

const animalOrUndef = { type: 'cat', canMeow: true } as Animal | undefined;
assertEqual(animalOrUndef?.type, 'cat' as const);

animalOrUndef.canMeow; // since is cat, should not be an error


//// [assertionFunctionsCanNarrowByDiscriminant.js]
"use strict";
var animal = { type: 'cat', canMeow: true };
assertEqual(animal.type, 'cat');
animal.canMeow; // since is cat, should not be an error
var animalOrUndef = { type: 'cat', canMeow: true };
assertEqual(animalOrUndef === null || animalOrUndef === void 0 ? void 0 : animalOrUndef.type, 'cat');
animalOrUndef.canMeow; // since is cat, should not be an error
