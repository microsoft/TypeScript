//// [tests/cases/compiler/typeParameterExtendingUnion2.ts] ////

//// [typeParameterExtendingUnion2.ts]
class Animal { run() { } }
class Cat extends Animal { meow }
class Dog extends Animal { woof }

function run(a: Cat | Dog) {
    a.run();
}

function f<T extends Cat | Dog>(a: T) {
    a.run();
    run(a);
}

//// [typeParameterExtendingUnion2.js]
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
