// @experimentalDecorators: true
// @target: es5

declare function deco(...args: [any, any, any]): any;

class Greeter {
    @deco
    greet1() {
        return "Hello, " + this.greeting;
    }
}
