//// [tests/cases/compiler/inheritedModuleMembersForClodule.ts] ////

//// [inheritedModuleMembersForClodule.ts]
class C {
    static foo(): string {
        return "123";
    }
}

class D extends C {
}

module D {
    export function foo(): number {
        return 0;
    };
}

class E extends D {
    static bar() {
        return this.foo();
    }
}


//// [inheritedModuleMembersForClodule.js]
class C {
    static foo() {
        return "123";
    }
}
class D extends C {
}
(function (D) {
    function foo() {
        return 0;
    }
    D.foo = foo;
    ;
})(D || (D = {}));
class E extends D {
    static bar() {
        return this.foo();
    }
}
