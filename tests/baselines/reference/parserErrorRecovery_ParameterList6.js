//// [parserErrorRecovery_ParameterList6.ts]
class Foo {
    public banana (x: break) { }
}

//// [parserErrorRecovery_ParameterList6.js]
var Foo = (function () {
    function Foo() {
    }
    Foo.prototype.banana = ;
    return Foo;
}());
break ;
{ }
