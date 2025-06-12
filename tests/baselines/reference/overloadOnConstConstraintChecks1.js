//// [tests/cases/compiler/overloadOnConstConstraintChecks1.ts] ////

//// [overloadOnConstConstraintChecks1.ts]
class Base { foo() { } }
class Derived1 extends Base { bar() { } }
class Derived2 extends Base { baz() { } }
class Derived3 extends Base { biz() { } }

interface MyDoc { // Document
    createElement(tagName: string): Base;
    createElement(tagName: 'canvas'): Derived1;
    createElement(tagName: 'div'): Derived2;
    createElement(tagName: 'span'): Derived3;
    // + 100 more
}

class D implements MyDoc {
    createElement(tagName:string): Base;
    createElement(tagName: 'canvas'): Derived1;
    createElement(tagName: 'div'): Derived2;
    createElement(tagName: 'span'): Derived3;
    createElement(tagName:any): Base {
        return null;
    }
}

//// [overloadOnConstConstraintChecks1.js]
class Base {
    foo() { }
}
class Derived1 extends Base {
    bar() { }
}
class Derived2 extends Base {
    baz() { }
}
class Derived3 extends Base {
    biz() { }
}
class D {
    createElement(tagName) {
        return null;
    }
}
