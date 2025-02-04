// @noEmit: true

interface Animal {
    name: string;
    species: string;
}

interface Dog extends Animal {
    breed: string;
}

type GreetRet<T> =
    T extends string ? string :
    T extends { name: string } ? { greeting: string, breed: string } :
    never;

function greet<T extends string | Dog>(animal: T): GreetRet<T> {
    if (typeof animal === "string") {
        return `hello, ${animal}`
    }
    return { greeting: `woof, ${animal.name}`, breed: animal.breed }
}

type BadRet<T> =
    T extends {} ? void :
    T extends string ? number :
    never;

function badFun<T extends { a: string } | string>(x: T): BadRet<T> {
    if (typeof x === "string") {
        return 1
    }
    return;
}

declare let arg2: { a: string } | string;
const badRet = badFun(arg2);