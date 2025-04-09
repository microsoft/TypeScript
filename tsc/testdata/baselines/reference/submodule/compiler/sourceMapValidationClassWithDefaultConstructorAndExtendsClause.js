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
    a = 10;
    nameA = "Ten";
}
//# sourceMappingURL=sourceMapValidationClassWithDefaultConstructorAndExtendsClause.js.map