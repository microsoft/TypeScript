//// [decoratorReferences.ts]
declare function y(...args: any[]): any;
type T = number;
@y(1 as T, C) // <-- T should be resolved to the type alias, not the type parameter of the class; C should resolve to the class
class C<T> {
    @y(null as T) // <-- y should resolve to the function declaration, not the parameter; T should resolve to the type parameter of the class
    method(@y x, y) {} // <-- decorator y should be resolved at the class declaration, not the parameter.
}

//// [decoratorReferences.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var C = /** @class */ (function () {
    function C() {
    }
    C_1 = C;
    C.prototype.method = function (x, y) { }; // <-- decorator y should be resolved at the class declaration, not the parameter.
    var C_1;
    __decorate([
        y(null) // <-- y should resolve to the function declaration, not the parameter; T should resolve to the type parameter of the class
        ,
        __param(0, y)
    ], C.prototype, "method");
    C = C_1 = __decorate([
        y(1, C_1) // <-- T should be resolved to the type alias, not the type parameter of the class; C should resolve to the class
    ], C);
    return C;
}());
