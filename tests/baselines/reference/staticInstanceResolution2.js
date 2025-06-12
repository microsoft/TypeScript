//// [tests/cases/compiler/staticInstanceResolution2.ts] ////

//// [staticInstanceResolution2.ts]
class A { }
A.hasOwnProperty('foo');

class B {
    constructor() { }
}
B.hasOwnProperty('foo');





//// [staticInstanceResolution2.js]
class A {
}
A.hasOwnProperty('foo');
class B {
    constructor() { }
}
B.hasOwnProperty('foo');
