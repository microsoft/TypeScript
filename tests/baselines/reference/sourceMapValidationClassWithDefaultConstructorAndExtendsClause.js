//// [tests/cases/compiler/sourceMapValidationClassWithDefaultConstructorAndExtendsClause.ts] ////

//// [sourceMapValidationClassWithDefaultConstructorAndExtendsClause.ts]
class AbstractGreeter {
}

class Greeter extends AbstractGreeter {
    public a = 10;
    public nameA = "Ten";
}

//// [sourceMapValidationClassWithDefaultConstructorAndExtendsClause.js]
class AbstractGreeter {
}
class Greeter extends AbstractGreeter {
    constructor() {
        super(...arguments);
        this.a = 10;
        this.nameA = "Ten";
    }
}
//# sourceMappingURL=sourceMapValidationClassWithDefaultConstructorAndExtendsClause.js.map