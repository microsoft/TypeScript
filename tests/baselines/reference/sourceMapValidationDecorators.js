//// [sourceMapValidationDecorators.ts]
declare function ClassDecorator1(target: Function): void;
declare function ClassDecorator2(x: number): (target: Function) => void;
declare function PropertyDecorator1(target: Object, key: string | symbol, descriptor?: PropertyDescriptor): void;
declare function PropertyDecorator2(x: number): (target: Object, key: string | symbol, descriptor?: PropertyDescriptor) => void;
declare function ParameterDecorator1(target: Function, key: string | symbol, paramIndex: number): void;
declare function ParameterDecorator2(x: number): (target: Function, key: string | symbol, paramIndex: number) => void;

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
var __decorate = this.__decorate || function (decorators, target, key, value) {
    var kind = typeof (arguments.length == 2 ? value = target : value);
    for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        switch (kind) {
            case "function": value = decorator(value) || value; break;
            case "number": decorator(target, key, value); break;
            case "undefined": decorator(target, key); break;
            case "object": value = decorator(target, key, value) || value; break;
        }
    }
    return value;
};
var __metadata = this.__metadata || (typeof Reflect === "object" && Reflect.metadata) || function (metadataKey, metadataValue) { return function() { } };
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
        set: function (greetings) {
            this.greeting = greetings;
        },
        enumerable: true,
        configurable: true
    });
    Greeter.x1 = 10;
    Object.defineProperty(Greeter.prototype, "greet", __decorate([PropertyDecorator1, PropertyDecorator2(40), __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', Object)], Greeter.prototype, "greet", Object.getOwnPropertyDescriptor(Greeter.prototype, "greet")));
    __decorate([PropertyDecorator1, PropertyDecorator2(50), __metadata('design:type', String)], Greeter.prototype, "x");
    __decorate([ParameterDecorator1, ParameterDecorator2(70), __metadata('design:type', Number)], Greeter.prototype, "fn", 0);
    __decorate([ParameterDecorator1, ParameterDecorator2(90), __metadata('design:type', String)], Greeter.prototype, "greetings", 0);
    Object.defineProperty(Greeter.prototype, "greetings", __decorate([PropertyDecorator1, PropertyDecorator2(80), __metadata('design:type', Object)], Greeter.prototype, "greetings", Object.getOwnPropertyDescriptor(Greeter.prototype, "greetings")));
    __decorate([PropertyDecorator1, PropertyDecorator2(60), __metadata('design:type', Number)], Greeter, "x1");
    __decorate([ParameterDecorator1, ParameterDecorator2(20), __metadata('design:type', String)], Greeter, void 0, 0);
    __decorate([ParameterDecorator1, ParameterDecorator2(30), __metadata('design:type', Array)], Greeter, void 0, 1);
    Greeter = __decorate([ClassDecorator1, ClassDecorator2(10), __metadata('design:paramtypes', [String, String])], Greeter);
    return Greeter;
})();
//# sourceMappingURL=sourceMapValidationDecorators.js.map