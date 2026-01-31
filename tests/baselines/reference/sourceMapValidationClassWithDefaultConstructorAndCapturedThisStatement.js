//// [tests/cases/compiler/sourceMapValidationClassWithDefaultConstructorAndCapturedThisStatement.ts] ////

//// [sourceMapValidationClassWithDefaultConstructorAndCapturedThisStatement.ts]
class Greeter {
    public a = 10;
    public returnA = () => this.a;
}

//// [sourceMapValidationClassWithDefaultConstructorAndCapturedThisStatement.js]
class Greeter {
    constructor() {
        this.a = 10;
        this.returnA = () => this.a;
    }
}
//# sourceMappingURL=sourceMapValidationClassWithDefaultConstructorAndCapturedThisStatement.js.map