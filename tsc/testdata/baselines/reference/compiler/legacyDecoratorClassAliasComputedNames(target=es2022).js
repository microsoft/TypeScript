//// [tests/cases/compiler/legacyDecoratorClassAliasComputedNames.ts] ////

//// [legacyDecoratorClassAliasComputedNames.ts]
declare function dec(value: any): any;

@dec
class C {
    [C.name]() {}
    get [C.name]() { return 1; }
    set [C.name](value: number) {}
}

@dec
class D {
    static [D.name] = 1;
    static getSelf() {
        return D;
    }
}

@dec
class Outer {
    method() {
        return class {
            [Outer.name]() {}
        };
    }
}


//// [legacyDecoratorClassAliasComputedNames.js]
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var C_1, D_1, Outer_1;
let C = C_1 = class C {
    [C_1.name]() { }
    get [C_1.name]() { return 1; }
    set [C_1.name](value) { }
};
C = C_1 = __decorate([
    dec
], C);
let D = class D {
    static { D_1 = this; }
    static [D_1.name] = 1;
    static getSelf() {
        return D_1;
    }
};
D = D_1 = __decorate([
    dec
], D);
let Outer = Outer_1 = class Outer {
    method() {
        return class {
            [Outer_1.name]() { }
        };
    }
};
Outer = Outer_1 = __decorate([
    dec
], Outer);
