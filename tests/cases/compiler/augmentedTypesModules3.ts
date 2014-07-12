//// module then class
module m3 { }
class m3 { } // ok since the module is not instantiated

module m3a { var y = 2; }
class m3a { foo() { } } // error, class isn't ambient or declared before the module