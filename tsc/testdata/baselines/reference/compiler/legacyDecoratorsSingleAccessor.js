//// [tests/cases/compiler/legacyDecoratorsSingleAccessor.ts] ////

//// [legacyDecoratorsSingleAccessor.ts]
declare function dec(target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor;

// Test case for single getter without setter
class C1 {
    @dec get accessor() { return 1; }
}

// Test case for single setter without getter
class C2 {
    @dec set accessor(value: number) { }
}


//// [legacyDecoratorsSingleAccessor.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// Test case for single getter without setter
class C1 {
    get accessor() { return 1; }
}
__decorate([
    dec
], C1.prototype, "accessor", null);
// Test case for single setter without getter
class C2 {
    set accessor(value) { }
}
__decorate([
    dec
], C2.prototype, "accessor", null);
