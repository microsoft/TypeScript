//// [experimentalDecoratorMetadataWithInference.ts]
namespace Reflect {
    export declare const getMetadata: any;
}

class Foo {
    @LogType public str1: string;
    @LogType public str2 = 'hello';
    @LogType public str3 = `hello`;
    @LogType public str4 = `he${"l"}lo`;
    @LogType public num1: number;
    @LogType public num2 = 10;
    @LogType public bool1: boolean;
    @LogType public bool2 = true;
    @LogType public symbol1: symbol;
    @LogType public symbol2 = Symbol.iterator;
    @LogType public func1: () => void;
    @LogType public func2 = () => void 0;
    @LogType public ctor1: new () => void;
    @LogType public ctor2 = class FooInner {};
}

function LogType(target: any, propertyKey: string) {
    const type = Reflect.getMetadata("design:type", target, propertyKey);
    console.log(type.name);
}

//// [experimentalDecoratorMetadataWithInference.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Reflect;
(function (Reflect) {
})(Reflect || (Reflect = {}));
class Foo {
    constructor() {
        this.str2 = 'hello';
        this.str3 = `hello`;
        this.str4 = `he${"l"}lo`;
        this.num2 = 10;
        this.bool2 = true;
        this.symbol2 = Symbol.iterator;
        this.func2 = () => void 0;
        this.ctor2 = class FooInner {
        };
    }
}
__decorate([
    LogType,
    __metadata("design:type", String)
], Foo.prototype, "str1", void 0);
__decorate([
    LogType,
    __metadata("design:type", String)
], Foo.prototype, "str2", void 0);
__decorate([
    LogType,
    __metadata("design:type", String)
], Foo.prototype, "str3", void 0);
__decorate([
    LogType,
    __metadata("design:type", String)
], Foo.prototype, "str4", void 0);
__decorate([
    LogType,
    __metadata("design:type", Number)
], Foo.prototype, "num1", void 0);
__decorate([
    LogType,
    __metadata("design:type", Number)
], Foo.prototype, "num2", void 0);
__decorate([
    LogType,
    __metadata("design:type", Boolean)
], Foo.prototype, "bool1", void 0);
__decorate([
    LogType,
    __metadata("design:type", Boolean)
], Foo.prototype, "bool2", void 0);
__decorate([
    LogType,
    __metadata("design:type", Symbol)
], Foo.prototype, "symbol1", void 0);
__decorate([
    LogType,
    __metadata("design:type", Symbol)
], Foo.prototype, "symbol2", void 0);
__decorate([
    LogType,
    __metadata("design:type", Function)
], Foo.prototype, "func1", void 0);
__decorate([
    LogType,
    __metadata("design:type", Function)
], Foo.prototype, "func2", void 0);
__decorate([
    LogType,
    __metadata("design:type", Function)
], Foo.prototype, "ctor1", void 0);
__decorate([
    LogType,
    __metadata("design:type", Function)
], Foo.prototype, "ctor2", void 0);
function LogType(target, propertyKey) {
    const type = Reflect.getMetadata("design:type", target, propertyKey);
    console.log(type.name);
}
