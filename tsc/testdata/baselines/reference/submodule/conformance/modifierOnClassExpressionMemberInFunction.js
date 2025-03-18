//// [tests/cases/conformance/classes/classExpressions/modifierOnClassExpressionMemberInFunction.ts] ////

//// [modifierOnClassExpressionMemberInFunction.ts]
function g() {
    var x = class C {
        public prop1 = 1;
        private foo() { }
        static prop2 = 43;
    }
}

//// [modifierOnClassExpressionMemberInFunction.js]
function g() {
    var x = class C {
        prop1 = 1;
        foo() { }
        static prop2 = 43;
    };
}
