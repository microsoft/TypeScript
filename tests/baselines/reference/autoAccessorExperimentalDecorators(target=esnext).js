//// [tests/cases/conformance/classes/propertyMemberDeclarations/autoAccessorExperimentalDecorators.ts] ////

//// [autoAccessorExperimentalDecorators.ts]
declare var dec: (target: any, key: PropertyKey, desc: PropertyDescriptor) => void;

class C1 {
    @dec
    accessor a: any;

    @dec
    static accessor b: any;
}

class C2 {
    @dec
    accessor #a: any;

    @dec
    static accessor #b: any;
}


//// [autoAccessorExperimentalDecorators.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
class C1 {
    accessor a;
    static accessor b;
}
__decorate([
    dec
], C1.prototype, "a", null);
__decorate([
    dec
], C1, "b", null);
class C2 {
    accessor #a;
    static accessor #b;
}
