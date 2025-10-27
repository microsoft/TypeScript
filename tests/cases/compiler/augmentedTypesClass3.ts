// class then module
class c5 { public foo() { } }
namespace c5 { } // should be ok

class c5a { public foo() { } }
namespace c5a { var y = 2; } // should be ok

class c5b { public foo() { } }
namespace c5b { export var y = 2; } // should be ok

//// class then import
class c5c { public foo() { } }
//import c5c = require('');