//// [tests/cases/compiler/decoratorMetadataObjectLiteralMethodNoCrash.ts] ////

//// [decoratorMetadataObjectLiteralMethodNoCrash.ts]
declare function dec(...args: any[]): any;

const o = {
    m(@dec x: string) {}
};

class C {
    @dec
    prop!: number;

    method() {
        return {
            m(@dec x: string) {},
            set s(@dec v: number) {}
        };
    }
}


//// [decoratorMetadataObjectLiteralMethodNoCrash.js]
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const o = {
    m(x) { }
};
class C {
    prop;
    method() {
        return {
            m(x) { },
            set s(v) { }
        };
    }
}
__decorate([
    dec,
    __metadata("design:type", Number)
], C.prototype, "prop", void 0);
