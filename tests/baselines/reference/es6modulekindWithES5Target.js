//// [es6modulekindWithES5Target.ts]
export class C {
    static s = 0;
    p = 1;
    method() { }
}
export { C as C2 };

declare function foo(...args: any[]): any;
@foo
export class D {
    static s = 0;
    p = 1;
    method() { }
}
export { D as D2 };

class E { }
export {E};


//// [es6modulekindWithES5Target.js]
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var C = (function () {
    function C() {
        this.p = 1;
    }
    C.prototype.method = function () { };
    __names(C.prototype, ["method"]);
    C.s = 0;
    return C;
}());
export { C };
export { C as C2 };
var D = (function () {
    function D() {
        this.p = 1;
    }
    D.prototype.method = function () { };
    __names(D.prototype, ["method"]);
    D.s = 0;
    D = __decorate([
        foo
    ], D);
    return D;
}());
export { D };
export { D as D2 };
var E = (function () {
    function E() {
    }
    return E;
}());
export { E };
