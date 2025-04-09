//// [tests/cases/compiler/sourceMapValidationClass.ts] ////

//// [sourceMapValidationClass.ts]
class Greeter {
    constructor(public greeting: string, ...b: string[]) {
    }
    greet() {
        return "<h1>" + this.greeting + "</h1>";
    }
    private x: string;
    private x1: number = 10;
    private fn() {
        return this.greeting;
    }
    get greetings() {
        return this.greeting;
    }
    set greetings(greetings: string) {
        this.greeting = greetings;
    }
}

//// [sourceMapValidationClass.js]
class Greeter {
    greeting;
    constructor(greeting, ...b) {
        this.greeting = greeting;
    }
    greet() {
        return "<h1>" + this.greeting + "</h1>";
    }
    x;
    x1 = 10;
    fn() {
        return this.greeting;
    }
    get greetings() {
        return this.greeting;
    }
    set greetings(greetings) {
        this.greeting = greetings;
    }
}
//# sourceMappingURL=sourceMapValidationClass.js.map