//// [sourceMapValidationDecorators.ts]
declare function ClassDecorator1(target: Function): void;
declare function ClassDecorator2(x: number): (target: Function) => void;
declare function PropertyDecorator1(target: Object, key: string | symbol, descriptor: PropertyDescriptor): void;
declare function PropertyDecorator2(x: number): (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => void;
declare function ParameterDecorator1(target: Function, paramIndex: number): void;
declare function ParameterDecorator2(x: number): (target: Function, paramIndex: number) => void;

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

    @PropertyDecorator1
    @PropertyDecorator2(90)
    set greetings(
      @ParameterDecorator1 
      @ParameterDecorator2(90) 
      greetings: string) {
        this.greeting = greetings;
    }
}

//// [sourceMapValidationDecorators.js]
var __decorate = this.__decorate || function (decorators, target, key) {
    var kind = key == null ? 0 : typeof key == "number" ? 1 : 2, result = target;
    if (kind == 2) result = Object.getOwnPropertyDescriptor(target, typeof key == "symbol" ? key : key = String(key));
    for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        result = (kind == 0 ? decorator(result) : kind == 1 ? decorator(target, key) : decorator(target, key, result)) || result;
    }
    if (kind == 2 && result) Object.defineProperty(target, key, result);
    if (kind == 0) return result;
};
var Greeter = (function () {
    function Greeter(greeting) {
        var b = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            b[_i - 1] = arguments[_i];
        }
        this.greeting = greeting;
    }
    Greeter.prototype.greet = function () {
        return "<h1>" + this.greeting + "</h1>";
    };
    Greeter.prototype.fn = function (x) {
        return this.greeting;
    };
    Object.defineProperty(Greeter.prototype, "greetings", {
        get: function () {
            return this.greeting;
        },
        set: _set_greetings = function (greetings) {
            this.greeting = greetings;
        },
        enumerable: true,
        configurable: true
    });
    Greeter.x1 = 10;
    __decorate([PropertyDecorator1, PropertyDecorator2(40)], Greeter.prototype, "greet");
    __decorate([PropertyDecorator1, PropertyDecorator2(50)], Greeter.prototype, "x");
    __decorate([PropertyDecorator1, PropertyDecorator2(60)], Greeter, "x1");
    __decorate([ParameterDecorator1, ParameterDecorator2(70)], Greeter.prototype.fn, 0);
    __decorate([ParameterDecorator1, ParameterDecorator2(90)], _set_greetings, 0);
    __decorate([PropertyDecorator1, PropertyDecorator2(80), PropertyDecorator1, PropertyDecorator2(90)], Greeter.prototype, "greetings");
    __decorate([ParameterDecorator1, ParameterDecorator2(20)], Greeter, 0);
    __decorate([ParameterDecorator1, ParameterDecorator2(30)], Greeter, 1);
    Greeter = __decorate([ClassDecorator1, ClassDecorator2(10)], Greeter);
    return Greeter;
    var _set_greetings;
})();
//# sourceMappingURL=sourceMapValidationDecorators.js.map