//// [tests/cases/compiler/decoratorUsedBeforeDeclaration.ts] ////

//// [decoratorUsedBeforeDeclaration.ts]
@lambda(Enum.No)
@deco(Enum.No)
class Greeter {
  @lambda(Enum.No)
  @deco(Enum.No)
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  @lambda(Enum.No)
  @deco(Enum.No)
  greet() {
    return "Hello, " + this.greeting;
  }

  @lambda
  @deco
  greet1() {
    return "Hello, " + this.greeting;
  }

  greet2(@lambda(Enum.No) @deco(Enum.No) param) {
    return "Hello, " + this.greeting;
  }

  greet3(@lambda @deco param) {
    return "Hello, " + this.greeting;
  }
}

function deco(...args: any[]): any {}

enum Enum {
  No = 0,
  Yes = 1,
}

const lambda = (...args: any[]): any => {};

@lambda(Enum.No)
@deco(Enum.No)
class Greeter1 {
  @lambda(Enum.No)
  @deco(Enum.No)
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  @lambda(Enum.No)
  @deco(Enum.No)
  greet() {
    return "Hello, " + this.greeting;
  }

  @lambda
  @deco
  greet1() {
    return "Hello, " + this.greeting;
  }

  greet2(@lambda(Enum.No) @deco(Enum.No) param) {
    return "Hello, " + this.greeting;
  }

  greet3(@lambda @deco param) {
    return "Hello, " + this.greeting;
  }
}


//// [decoratorUsedBeforeDeclaration.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var Greeter = /** @class */ (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    Greeter.prototype.greet1 = function () {
        return "Hello, " + this.greeting;
    };
    Greeter.prototype.greet2 = function (param) {
        return "Hello, " + this.greeting;
    };
    Greeter.prototype.greet3 = function (param) {
        return "Hello, " + this.greeting;
    };
    __decorate([
        lambda(Enum.No),
        deco(Enum.No)
    ], Greeter.prototype, "greeting", void 0);
    __decorate([
        lambda(Enum.No),
        deco(Enum.No)
    ], Greeter.prototype, "greet", null);
    __decorate([
        lambda,
        deco
    ], Greeter.prototype, "greet1", null);
    __decorate([
        __param(0, lambda(Enum.No)),
        __param(0, deco(Enum.No))
    ], Greeter.prototype, "greet2", null);
    __decorate([
        __param(0, lambda),
        __param(0, deco)
    ], Greeter.prototype, "greet3", null);
    Greeter = __decorate([
        lambda(Enum.No),
        deco(Enum.No)
    ], Greeter);
    return Greeter;
}());
function deco() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
}
var Enum;
(function (Enum) {
    Enum[Enum["No"] = 0] = "No";
    Enum[Enum["Yes"] = 1] = "Yes";
})(Enum || (Enum = {}));
var lambda = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
};
var Greeter1 = /** @class */ (function () {
    function Greeter1(message) {
        this.greeting = message;
    }
    Greeter1.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    Greeter1.prototype.greet1 = function () {
        return "Hello, " + this.greeting;
    };
    Greeter1.prototype.greet2 = function (param) {
        return "Hello, " + this.greeting;
    };
    Greeter1.prototype.greet3 = function (param) {
        return "Hello, " + this.greeting;
    };
    __decorate([
        lambda(Enum.No),
        deco(Enum.No)
    ], Greeter1.prototype, "greeting", void 0);
    __decorate([
        lambda(Enum.No),
        deco(Enum.No)
    ], Greeter1.prototype, "greet", null);
    __decorate([
        lambda,
        deco
    ], Greeter1.prototype, "greet1", null);
    __decorate([
        __param(0, lambda(Enum.No)),
        __param(0, deco(Enum.No))
    ], Greeter1.prototype, "greet2", null);
    __decorate([
        __param(0, lambda),
        __param(0, deco)
    ], Greeter1.prototype, "greet3", null);
    Greeter1 = __decorate([
        lambda(Enum.No),
        deco(Enum.No)
    ], Greeter1);
    return Greeter1;
}());
