//// [tests/cases/conformance/classes/propertyMemberDeclarations/memberFunctionDeclarations/staticMemberAssignsToConstructorFunctionMembers.ts] ////

//// [staticMemberAssignsToConstructorFunctionMembers.ts]
class C {
    static foo() {
        C.foo = () => { }
    }

    static bar(x: number): number {
        C.bar = () => { } // error
        C.bar = (x) => x; // ok
        C.bar = (x: number) => 1; // ok
        return 1;
    }
}

//// [staticMemberAssignsToConstructorFunctionMembers.js]
class C {
    static foo() {
        C.foo = () => { };
    }
    static bar(x) {
        C.bar = () => { }; // error
        C.bar = (x) => x; // ok
        C.bar = (x) => 1; // ok
        return 1;
    }
}
