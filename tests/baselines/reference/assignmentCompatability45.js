//// [tests/cases/compiler/assignmentCompatability45.ts] ////

//// [assignmentCompatability45.ts]
abstract class A {}
class B extends A {
    constructor(x: number) {
        super();
    }
}
const b: typeof A = B;


//// [assignmentCompatability45.js]
class A {
}
class B extends A {
    constructor(x) {
        super();
    }
}
const b = B;
