// @strict: true

interface A { a: string }
interface B { b: string }
interface C { c: string }

type AA = {
    (): void;
    prototype: A;
}

type BB = {
    new(): B;
}

function foo(x: A | B | C, A: AA, B: BB, AB: AA | BB) {
    if (x instanceof A) {
        x;  // A
    }
    else {
        x;  // B | C
    }
    if (x instanceof B) {
        x;  // B
    }
    else {
        x;  // A | C
    }
    if (x instanceof AB) {
        x;  // A | B
    }
    else {
        x;  // A | B | C
    }
}

function bar(target: any, Promise: any) {
    if (target instanceof Promise) {
        target.__then();
    }
}

// Repro from #52571

class PersonMixin extends Function {
    public check(o: any) {
        return typeof o === "object" && o !== null && o instanceof Person;
    }    
}

const cls = new PersonMixin();

class Person {
    work(): void { console.log("work") }
    sayHi(): void { console.log("Hi") }
}

class Car {
    sayHi(): void { console.log("Wof Wof") }
}

function test(o: Person | Car) {
    if (o instanceof cls) {
        console.log("Is Person");
        (o as Person).work()
    }
    else {
        console.log("Is Car")
        o.sayHi();
    }
}
