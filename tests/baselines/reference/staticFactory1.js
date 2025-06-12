//// [tests/cases/conformance/classes/propertyMemberDeclarations/memberFunctionDeclarations/staticFactory1.ts] ////

//// [staticFactory1.ts]
class Base {
    foo() { return 1; }
    static create() {
        return new this();
    }
}

class Derived extends Base {
    foo() { return 2; }
}
var d = Derived.create(); 

d.foo();  

//// [staticFactory1.js]
class Base {
    foo() { return 1; }
    static create() {
        return new this();
    }
}
class Derived extends Base {
    foo() { return 2; }
}
var d = Derived.create();
d.foo();
