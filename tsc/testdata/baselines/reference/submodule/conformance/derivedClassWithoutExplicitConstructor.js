//// [tests/cases/conformance/classes/constructorDeclarations/automaticConstructors/derivedClassWithoutExplicitConstructor.ts] ////

//// [derivedClassWithoutExplicitConstructor.ts]
class Base {
    a = 1;
    constructor(x: number) { this.a = x; }
}

class Derived extends Base {
    x = 1
    y = 'hello';
}

var r = new Derived(); // error
var r2 = new Derived(1); 

class Base2<T> {
    a: T;
    constructor(x: T) { this.a = x; }
}

class D<T extends Date> extends Base2<T> {
    x = 2
    y: T = null;
}

var d = new D(); // error
var d2 = new D(new Date()); // ok

//// [derivedClassWithoutExplicitConstructor.js]
class Base {
    a = 1;
    constructor(x) { this.a = x; }
}
class Derived extends Base {
    x = 1;
    y = 'hello';
}
var r = new Derived();
var r2 = new Derived(1);
class Base2 {
    a;
    constructor(x) { this.a = x; }
}
class D extends Base2 {
    x = 2;
    y = null;
}
var d = new D();
var d2 = new D(new Date());
