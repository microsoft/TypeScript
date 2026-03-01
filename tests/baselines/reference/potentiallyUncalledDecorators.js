//// [tests/cases/compiler/potentiallyUncalledDecorators.ts] ////

//// [potentiallyUncalledDecorators.ts]
// Angular-style Input/Output API:
declare function Input(bindingPropertyName?: string): any;
class FooComponent {
    @Input foo: string;
}

// Glimmer-style tracked API:
declare const tracked: PropertyDecorator & { (...watchedProperties: string[]): any; }

class Person {
    @tracked person; any;
}

class MultiplyByTwo {
    args: any;
    @tracked('args')
    get multiplied() {
        return this.args.number * 2;
    }
}

// Other fun stuff.

interface OmniDecorator extends MethodDecorator, ClassDecorator, PropertyDecorator {
}

declare function noArgs(): OmniDecorator;
declare function allRest(...args: any[]): OmniDecorator;
declare function oneOptional(x?: any): OmniDecorator;
declare function twoOptional(x?: any, y?: any): OmniDecorator;
declare function threeOptional(x?: any, y?: any, z?: any): OmniDecorator;
declare function oneOptionalWithRest(x?: any, ...args: any[]): OmniDecorator;
declare const anyDec: any;

@noArgs
class A {
    @noArgs foo: any;
    @noArgs bar() { }
}

@allRest
class B {
    @allRest foo: any;
    @allRest bar() { }
}

@oneOptional
class C {
    @oneOptional foo: any;
    @oneOptional bar() { }
}

@twoOptional
class D {
    @twoOptional foo: any;
    @twoOptional bar() { }
}

@threeOptional
class E {
    @threeOptional foo: any;
    @threeOptional bar() { }
}

@oneOptionalWithRest
class F {
    @oneOptionalWithRest foo: any;
    @oneOptionalWithRest bar() { }
}

@anyDec
class G {
    @anyDec foo: any;
    @anyDec bar() { }
}

export { };


//// [potentiallyUncalledDecorators.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
class FooComponent {
}
__decorate([
    Input
], FooComponent.prototype, "foo", void 0);
class Person {
}
__decorate([
    tracked
], Person.prototype, "person", void 0);
class MultiplyByTwo {
    get multiplied() {
        return this.args.number * 2;
    }
}
__decorate([
    tracked('args')
], MultiplyByTwo.prototype, "multiplied", null);
let A = class A {
    bar() { }
};
__decorate([
    noArgs
], A.prototype, "foo", void 0);
__decorate([
    noArgs
], A.prototype, "bar", null);
A = __decorate([
    noArgs
], A);
let B = class B {
    bar() { }
};
__decorate([
    allRest
], B.prototype, "foo", void 0);
__decorate([
    allRest
], B.prototype, "bar", null);
B = __decorate([
    allRest
], B);
let C = class C {
    bar() { }
};
__decorate([
    oneOptional
], C.prototype, "foo", void 0);
__decorate([
    oneOptional
], C.prototype, "bar", null);
C = __decorate([
    oneOptional
], C);
let D = class D {
    bar() { }
};
__decorate([
    twoOptional
], D.prototype, "foo", void 0);
__decorate([
    twoOptional
], D.prototype, "bar", null);
D = __decorate([
    twoOptional
], D);
let E = class E {
    bar() { }
};
__decorate([
    threeOptional
], E.prototype, "foo", void 0);
__decorate([
    threeOptional
], E.prototype, "bar", null);
E = __decorate([
    threeOptional
], E);
let F = class F {
    bar() { }
};
__decorate([
    oneOptionalWithRest
], F.prototype, "foo", void 0);
__decorate([
    oneOptionalWithRest
], F.prototype, "bar", null);
F = __decorate([
    oneOptionalWithRest
], F);
let G = class G {
    bar() { }
};
__decorate([
    anyDec
], G.prototype, "foo", void 0);
__decorate([
    anyDec
], G.prototype, "bar", null);
G = __decorate([
    anyDec
], G);
export {};
