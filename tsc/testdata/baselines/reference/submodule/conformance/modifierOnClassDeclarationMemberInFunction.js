//// [tests/cases/conformance/classes/classDeclarations/modifierOnClassDeclarationMemberInFunction.ts] ////

//// [modifierOnClassDeclarationMemberInFunction.ts]
function f() {
    class C {
        public baz = 1;
        static foo() { }
        public bar() { }
    }
}

//// [modifierOnClassDeclarationMemberInFunction.js]
function f() {
    class C {
        baz = 1;
        static foo() { }
        bar() { }
    }
}
