//// [tests/cases/conformance/externalModules/es6/es6modulekindWithES5Target11.ts] ////

//// [es6modulekindWithES5Target11.ts]
declare function foo(...args: any[]): any;
@foo
export default class C {
    static x() { return C.y; }
    static y = 1
    p = 1;
    method() { }
}

//// [es6modulekindWithES5Target11.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var C_1;
let C = C_1 = class C {
    static x() { return C_1.y; }
    static y = 1;
    p = 1;
    method() { }
};
C = C_1 = __decorate([
    foo
], C);
export default C;
