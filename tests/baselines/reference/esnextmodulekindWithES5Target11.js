//// [esnextmodulekindWithES5Target11.ts]
declare function foo(...args: any[]): any;
@foo
export default class C {
    static x() { return C.y; }
    static y = 1
    p = 1;
    method() { }
}

//// [esnextmodulekindWithES5Target11.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var C = /** @class */ (function () {
    function C() {
        this.p = 1;
    }
    C_1 = C;
    C.x = function () { return C_1.y; };
    C.prototype.method = function () { };
    var C_1;
    C.y = 1;
    C = C_1 = __decorate([
        foo
    ], C);
    return C;
}());
export default C;
