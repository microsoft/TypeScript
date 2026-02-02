//// [tests/cases/compiler/sourceMapValidationClassWithDefaultConstructor.ts] ////

//// [sourceMapValidationClassWithDefaultConstructor.ts]
class Greeter {
    public a = 10;
    public nameA = "Ten";
}

//// [sourceMapValidationClassWithDefaultConstructor.js]
class Greeter {
    constructor() {
        this.a = 10;
        this.nameA = "Ten";
    }
}
//# sourceMappingURL=sourceMapValidationClassWithDefaultConstructor.js.map