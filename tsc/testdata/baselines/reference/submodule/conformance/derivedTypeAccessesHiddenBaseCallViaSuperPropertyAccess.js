//// [tests/cases/conformance/classes/propertyMemberDeclarations/memberFunctionDeclarations/derivedTypeAccessesHiddenBaseCallViaSuperPropertyAccess.ts] ////

//// [derivedTypeAccessesHiddenBaseCallViaSuperPropertyAccess.ts]
class Base {
    foo(x: { a: number }): { a: number } {
        return null;
    }
}

class Derived extends Base {
    foo(x: { a: number; b: number }): { a: number; b: number } {
        return null;
    }

    bar() {
        var r = super.foo({ a: 1 }); // { a: number }
        var r2 = super.foo({ a: 1, b: 2 }); // { a: number }
        var r3 = this.foo({ a: 1, b: 2 }); // { a: number; b: number; }
    }
}

//// [derivedTypeAccessesHiddenBaseCallViaSuperPropertyAccess.js]
class Base {
    foo(x) {
        return null;
    }
}
class Derived extends Base {
    foo(x) {
        return null;
    }
    bar() {
        var r = super.foo({ a: 1 });
        var r2 = super.foo({ a: 1, b: 2 });
        var r3 = this.foo({ a: 1, b: 2 });
    }
}
