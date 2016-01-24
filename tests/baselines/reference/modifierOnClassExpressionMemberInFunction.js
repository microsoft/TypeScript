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
    var x = (function () {
        function C() {
            this.prop1 = 1;
        }
        C.prototype.foo = function () { };
        C.prop2 = 43;
        return C;
    }());
}


//// [modifierOnClassExpressionMemberInFunction.d.ts]
declare function g(): void;
