interface Foo {
    a: string;
    b: number;
};

interface Bar {
    b: string;
}

interface Other {
    totallyUnrelatedProperty: number;
}

export let x = { a: '', b: '' };

declare function f(x: Foo | Other): any;

f(x);
f({ a: '', b: '' })

declare function g(x: Bar | Other): any;

g(x);
g({ a: '', b: '' })

declare function h(x: Foo | Bar | Other): any;

h(x);
h({ a: '', b: '' })

interface CatDog { cat: any, dog: any }
interface ManBearPig { man: any, bear: any, pig: any }
interface Platypus { platypus: any }

type ExoticAnimal =
    | CatDog
    | ManBearPig
    | Platypus;

declare function addToZoo(animal: ExoticAnimal): void;

addToZoo({ dog: "Barky McBarkface" });
addToZoo({ man: "Manny", bear: "Coffee" });

const manBeer = { man: "Manny", beer: "Coffee" };
addToZoo({ man: "Manny", beer: "Coffee" });
addToZoo(manBeer);