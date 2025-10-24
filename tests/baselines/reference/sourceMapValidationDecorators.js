//// [tests/cases/compiler/sourceMapValidationDecorators.ts] ////

//// [sourceMapValidationDecorators.ts]
declare function ClassDecorator1(target: Function): void;
declare function ClassDecorator2(x: number): (target: Function) => void;
declare function PropertyDecorator1(target: Object, key: string | symbol, descriptor?: PropertyDescriptor): void;
declare function PropertyDecorator2(x: number): (target: Object, key: string | symbol, descriptor?: PropertyDescriptor) => void;
declare function ParameterDecorator1(target: Object, key: string | symbol, paramIndex: number): void;
declare function ParameterDecorator2(x: number): (target: Object, key: string | symbol, paramIndex: number) => void;

@ClassDecorator1
@ClassDecorator2(10)
class Greeter {
    constructor(
      @ParameterDecorator1 
      @ParameterDecorator2(20) 
      public greeting: string, 
      
      @ParameterDecorator1 
      @ParameterDecorator2(30) 
      ...b: string[]) {
    }
    
    @PropertyDecorator1
    @PropertyDecorator2(40)
    greet() {
        return "<h1>" + this.greeting + "</h1>";
    }

    @PropertyDecorator1
    @PropertyDecorator2(50)
    private x: string;

    @PropertyDecorator1
    @PropertyDecorator2(60)
    private static x1: number = 10;
    
    private fn(
      @ParameterDecorator1 
      @ParameterDecorator2(70) 
      x: number) {
        return this.greeting;
    }

    @PropertyDecorator1
    @PropertyDecorator2(80)
    get greetings() {
        return this.greeting;
    }

    set greetings(
      @ParameterDecorator1 
      @ParameterDecorator2(90) 
      greetings: string) {
        this.greeting = greetings;
    }    
}

//// [sourceMapValidationDecorators.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
let Greeter = class Greeter {
    constructor(greeting, ...b) {
        this.greeting = greeting;
    }
    greet() {
        return "<h1>" + this.greeting + "</h1>";
    }
    fn(x) {
        return this.greeting;
    }
    get greetings() {
        return this.greeting;
    }
    set greetings(greetings) {
        this.greeting = greetings;
    }
};
Greeter.x1 = 10;
__decorate([
    PropertyDecorator1,
    PropertyDecorator2(40)
], Greeter.prototype, "greet", null);
__decorate([
    PropertyDecorator1,
    PropertyDecorator2(50)
], Greeter.prototype, "x", void 0);
__decorate([
    __param(0, ParameterDecorator1),
    __param(0, ParameterDecorator2(70))
], Greeter.prototype, "fn", null);
__decorate([
    PropertyDecorator1,
    PropertyDecorator2(80),
    __param(0, ParameterDecorator1),
    __param(0, ParameterDecorator2(90))
], Greeter.prototype, "greetings", null);
__decorate([
    PropertyDecorator1,
    PropertyDecorator2(60)
], Greeter, "x1", void 0);
Greeter = __decorate([
    ClassDecorator1,
    ClassDecorator2(10),
    __param(0, ParameterDecorator1),
    __param(0, ParameterDecorator2(20)),
    __param(1, ParameterDecorator1),
    __param(1, ParameterDecorator2(30))
], Greeter);
//# sourceMappingURL=sourceMapValidationDecorators.js.map