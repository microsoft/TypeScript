function foo() { }

var x = new foo(); // can be used as a constructor function

struct C extends foo { } // error, cannot extend it though