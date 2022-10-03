// @declaration: true

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