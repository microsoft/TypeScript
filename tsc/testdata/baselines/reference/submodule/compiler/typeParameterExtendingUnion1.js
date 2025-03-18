//// [tests/cases/compiler/typeParameterExtendingUnion1.ts] ////

//// [typeParameterExtendingUnion1.ts]
class Animal { run() { } }
class Cat extends Animal { meow }
class Dog extends Animal { woof }

function run(a: Animal) {
    a.run();
}

function f<T extends Cat | Dog>(a: T) {
    a.run();
    run(a);
}

//// [typeParameterExtendingUnion1.js]
class Animal {
    run() { }
}
class Cat extends Animal {
    meow;
}
class Dog extends Animal {
    woof;
}
function run(a) {
    a.run();
}
function f(a) {
    a.run();
    run(a);
}
