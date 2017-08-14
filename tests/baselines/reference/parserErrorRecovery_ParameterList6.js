//// [parserErrorRecovery_ParameterList6.ts]
class Foo {
    public banana (x: break) { }
}

//// [parserErrorRecovery_ParameterList6.js]
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
break ;
{ }
