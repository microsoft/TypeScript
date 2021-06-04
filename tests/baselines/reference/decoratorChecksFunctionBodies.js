//// [decoratorChecksFunctionBodies.ts]
// from #2971
function func(s: string): void {
}

class A {
    @((x, p) => {
        var a = 3;
        func(a);
        return x; 
    })
    m() {

    }
}

const A1 = class {
    @((x, p) => {
        var a = 3;
        func(a);
        return x; 
    })
    m() {

    }
}


//// [decoratorChecksFunctionBodies.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a;
// from #2971
function func(s) {
}
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.m = function () {
    };
    __decorate([
        (function (x, p) {
            var a = 3;
            func(a);
            return x;
        })
    ], A.prototype, "m", null);
    return A;
}());
var A1 = (_a = /** @class */ (function () {
    function class_1() {
    }
    class_1.prototype.m = function () {
    };
    return class_1;
}()), __decorate([
    (function (x, p) {
        var a = 3;
        func(a);
        return x;
    })
], _a.prototype, "m", null), _a);
