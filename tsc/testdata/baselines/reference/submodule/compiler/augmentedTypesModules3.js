//// [tests/cases/compiler/augmentedTypesModules3.ts] ////

//// [augmentedTypesModules3.ts]
//// module then class
module m3 { }
class m3 { } // ok since the module is not instantiated

module m3a { var y = 2; }
class m3a { foo() { } } // error, class isn't ambient or declared before the module

//// [augmentedTypesModules3.js]
class m3 {
}
var m3a;
(function (m3a) {
    var y = 2;
})(m3a || (m3a = {}));
class m3a {
    foo() { }
}
