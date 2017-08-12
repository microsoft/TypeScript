//// [modifierOnClassExpressionMemberInFunction.ts]
function g() {
    var x = class C {
        public prop1 = 1;
        private foo() { }
        static prop2 = 43;
    }
}

//// [modifierOnClassExpressionMemberInFunction.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
function g() {
    var x = (_a = (function () {
            function C() {
                this.prop1 = 1;
            }
            C.prototype.foo = function () { };
            __names(C.prototype, ["foo"]);
            return C;
        }()),
        _a.prop2 = 43,
        _a);
    var _a;
}


//// [modifierOnClassExpressionMemberInFunction.d.ts]
declare function g(): void;
