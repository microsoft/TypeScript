//// [tests/cases/compiler/overloadOnConstantsInvalidOverload1.ts] ////

//// [overloadOnConstantsInvalidOverload1.ts]
class Base { foo() { } }
class Derived1 extends Base { bar() { } }
class Derived2 extends Base { baz() { } }
class Derived3 extends Base { biz() { } }

function foo(name: "SPAN"): Derived1;
function foo(name: "DIV"): Derived2 {
    return null;
}

foo("HI");

//// [overloadOnConstantsInvalidOverload1.js]
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
function foo(name) {
    return null;
}
foo("HI");
