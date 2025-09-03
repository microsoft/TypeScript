//// [tests/cases/conformance/classes/classDeclarations/classHeritageSpecification/derivedTypeDoesNotRequireExtendsClause.ts] ////

//// [derivedTypeDoesNotRequireExtendsClause.ts]
class Base {
    foo: string;
}

class Derived {
    foo: string;
    bar: number;
}

class Derived2 extends Base {
    bar: string;
}

var b: Base;
var d1: Derived;
var d2: Derived2;
b = d1;
b = d2;

var r: Base[] = [d1, d2];

//// [derivedTypeDoesNotRequireExtendsClause.js]
class Base {
    foo;
}
class Derived {
    foo;
    bar;
}
class Derived2 extends Base {
    bar;
}
var b;
var d1;
var d2;
b = d1;
b = d2;
var r = [d1, d2];
