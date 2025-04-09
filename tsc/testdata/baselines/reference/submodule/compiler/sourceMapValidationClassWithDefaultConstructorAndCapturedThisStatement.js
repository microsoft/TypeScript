//// [tests/cases/compiler/sourceMapValidationClassWithDefaultConstructorAndCapturedThisStatement.ts] ////

//// [sourceMapValidationClassWithDefaultConstructorAndCapturedThisStatement.ts]
class Greeter {
    public a = 10;
    public returnA = () => this.a;
}

//// [sourceMapValidationClassWithDefaultConstructorAndCapturedThisStatement.js]
class Greeter {
    a = 10;
    returnA = () => this.a;
}
//# sourceMappingURL=sourceMapValidationClassWithDefaultConstructorAndCapturedThisStatement.js.map