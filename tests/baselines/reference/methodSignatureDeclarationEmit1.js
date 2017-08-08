//// [methodSignatureDeclarationEmit1.ts]
class C {
  public foo(n: number): void;
  public foo(s: string): void;
  public foo(a: any): void {
  }
}

//// [methodSignatureDeclarationEmit1.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
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
var C = (function () {
    function C() {
    }
    C.prototype.foo = function (a) {
    };
    __names(C.prototype, ["foo"]);
    return C;
}());


//// [methodSignatureDeclarationEmit1.d.ts]
declare class C {
    foo(n: number): void;
    foo(s: string): void;
}
