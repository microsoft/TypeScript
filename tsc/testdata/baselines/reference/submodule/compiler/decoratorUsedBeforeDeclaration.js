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
@lambda(Enum.No)
@deco(Enum.No)
class Greeter {
    @lambda(Enum.No)
    @deco(Enum.No)
    greeting;
    constructor(message) {
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
    greet2(param) {
        return "Hello, " + this.greeting;
    }
    greet3(param) {
        return "Hello, " + this.greeting;
    }
}
function deco(...args) { }
var Enum;
(function (Enum) {
    Enum[Enum["No"] = 0] = "No";
    Enum[Enum["Yes"] = 1] = "Yes";
})(Enum || (Enum = {}));
const lambda = (...args) => { };
@lambda(Enum.No)
@deco(Enum.No)
class Greeter1 {
    @lambda(Enum.No)
    @deco(Enum.No)
    greeting;
    constructor(message) {
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
    greet2(param) {
        return "Hello, " + this.greeting;
    }
    greet3(param) {
        return "Hello, " + this.greeting;
    }
}
