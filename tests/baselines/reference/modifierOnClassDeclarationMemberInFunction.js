//// [modifierOnClassDeclarationMemberInFunction.ts]
function f() {
    class C {
        public baz = 1;
        static foo() { }
        public bar() { }
    }
}

//// [modifierOnClassDeclarationMemberInFunction.js]
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
function f() {
    var C = (function () {
        function C() {
            this.baz = 1;
        }
        C.foo = function () { };
        C.prototype.bar = function () { };
        __names(C.prototype, ["bar"]);
        return C;
    }());
}


//// [modifierOnClassDeclarationMemberInFunction.d.ts]
declare function f(): void;
