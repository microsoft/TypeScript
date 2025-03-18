//// [tests/cases/conformance/classes/propertyMemberDeclarations/memberFunctionDeclarations/instanceMemberAssignsToClassPrototype.ts] ////

//// [instanceMemberAssignsToClassPrototype.ts]
class C {
    foo() {
        C.prototype.foo = () => { }
    }

    bar(x: number): number {
        C.prototype.bar = () => { } // error
        C.prototype.bar = (x) => x; // ok
        C.prototype.bar = (x: number) => 1; // ok
        return 1;
    }
}

//// [instanceMemberAssignsToClassPrototype.js]
class C {
    foo() {
        C.prototype.foo = () => { };
    }
    bar(x) {
        C.prototype.bar = () => { };
        C.prototype.bar = (x) => x;
        C.prototype.bar = (x) => 1;
        return 1;
    }
}
