//// [tests/cases/compiler/assignmentCompatability44.ts] ////

//// [assignmentCompatability44.ts]
class Foo {
    constructor(x: number) {}
}

const foo: { new(): Foo } = Foo;


//// [assignmentCompatability44.js]
class Foo {
    constructor(x) { }
}
const foo = Foo;
