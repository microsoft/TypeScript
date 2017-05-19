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
    var x = (_a = (function () {
            function C() {
                this.prop1 = 1;
            }
            C.prototype.foo = function () { };
            return C;
        }()),
        _a.prop2 = 43,
        _a);
    var _a;
}


//// [modifierOnClassExpressionMemberInFunction.d.ts]
declare function g(): void;
