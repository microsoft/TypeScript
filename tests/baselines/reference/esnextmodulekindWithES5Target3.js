//// [esnextmodulekindWithES5Target3.ts]
declare function foo(...args: any[]): any;
@foo
export default class D {
    static s = 0;
    p = 1;
    method() { }
}

//// [esnextmodulekindWithES5Target3.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var D = /** @class */ (function () {
    function D() {
        this.p = 1;
    }
    D.prototype.method = function () { };
    D.s = 0;
    D = __decorate([
        foo
    ], D);
    return D;
}());
export default D;
