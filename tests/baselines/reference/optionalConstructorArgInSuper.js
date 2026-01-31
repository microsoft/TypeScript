//// [tests/cases/compiler/optionalConstructorArgInSuper.ts] ////

//// [optionalConstructorArgInSuper.ts]
class Base {
    constructor(opt?) { }
    foo(other?) { }
}
class Derived extends Base {
}
var d = new Derived(); // bug caused an error here, couldn't select overload
var d2: Derived;
d2.foo(); 


//// [optionalConstructorArgInSuper.js]
class Base {
    constructor(opt) { }
    foo(other) { }
}
class Derived extends Base {
}
var d = new Derived(); // bug caused an error here, couldn't select overload
var d2;
d2.foo();
