//// [tests/cases/conformance/es6/decorators/class/decoratorOnClass8.es6.ts] ////

//// [decoratorOnClass8.es6.ts]
declare function dec<T>(target: T): T;

@dec
export default class {
    static y = 1;
}

//// [decoratorOnClass8.es6.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _a;
let default_1 = _a = class {
};
__setFunctionName(_a, "default");
default_1.y = 1;
default_1 = __decorate([
    dec
], default_1);
export default default_1;
