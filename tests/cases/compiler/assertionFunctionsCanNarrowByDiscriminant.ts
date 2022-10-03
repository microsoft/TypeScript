// @strict: true
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
