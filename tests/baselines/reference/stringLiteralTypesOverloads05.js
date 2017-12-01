//// [stringLiteralTypesOverloads05.ts]
interface Animal { animal: {} };
interface Dog extends Animal { dog: {} }
interface Cat extends Animal { cat: {} }
interface Moose extends Animal { moose: {} }

function doThing(x: "dog"): Dog;
function doThing(x: "cat"): Cat;
function doThing(x: string): Animal;
function doThing(x: string, y?: string): Moose {
    return undefined;
}

//// [stringLiteralTypesOverloads05.js]
;
function doThing(x, y) {
    return undefined;
}


//// [stringLiteralTypesOverloads05.d.ts]
interface Animal {
    animal: {};
}
interface Dog extends Animal {
    dog: {};
}
interface Cat extends Animal {
    cat: {};
}
interface Moose extends Animal {
    moose: {};
}
declare function doThing(x: "dog"): Dog;
declare function doThing(x: "cat"): Cat;
declare function doThing(x: string): Animal;
