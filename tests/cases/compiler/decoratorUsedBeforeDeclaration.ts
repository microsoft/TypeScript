// @experimentalDecorators: true
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
