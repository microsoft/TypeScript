// @experimentalDecorators: true

class Greeter {
    @deco
    greet1() {
        return "Hello, " + this.greeting;
    }
}

declare function deco(...args: [any, any, any]): any;
