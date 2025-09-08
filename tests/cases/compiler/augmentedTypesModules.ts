// module then var
namespace m1 { }
var m1 = 1; // Should be allowed

namespace m1a { var y = 2; } // error
var m1a = 1; // error

namespace m1b { export var y = 2; } // error
var m1b = 1; // error

namespace m1c {
    export interface I { foo(): void; }
}
var m1c = 1; // Should be allowed

namespace m1d { // error
    export class I { foo() { } }
}
var m1d = 1; // error

// module then function
namespace m2 { }
function m2() { }; // ok since the module is not instantiated

namespace m2a { var y = 2; }
function m2a() { }; // error since the module is instantiated

namespace m2b { export var y = 2; }
function m2b() { };  // error since the module is instantiated

// should be errors to have function first
function m2c() { }; 
namespace m2c { export var y = 2; } 

namespace m2d { }
declare function m2d(): void; 

declare function m2e(): void; 
namespace m2e { }

function m2f() { };
namespace m2f { export interface I { foo(): void } } 

function m2g() { };
namespace m2g { export class C { foo() { } } } 

// module then class
namespace m3 { }
class m3 { } // ok since the module is not instantiated

namespace m3a { var y = 2; }
class m3a { foo() { } } // error, class isn't ambient or declared before the module

class m3b { foo() { } }
namespace m3b { var y = 2; }

class m3c { foo() { } }
namespace m3c { export var y = 2; } 

declare class m3d { foo(): void }
namespace m3d { export var y = 2; } 

namespace m3e { export var y = 2; } 
declare class m3e { foo(): void } 

declare class m3f { foo(): void }
namespace m3f { export interface I { foo(): void } }

declare class m3g { foo(): void }
namespace m3g { export class C { foo() { } } }

// module then enum
// should be errors
namespace m4 { }
enum m4 { }

namespace m4a { var y = 2; }
enum m4a { One }

namespace m4b { export var y = 2; }
enum m4b { One }

namespace m4c { interface I { foo(): void } }
enum m4c { One }

namespace m4d { class C { foo() { } } }
enum m4d { One }

//// module then module

namespace m5 { export var y = 2; }
namespace m5 { export interface I { foo(): void } } // should already be reasonably well covered

// module then import
namespace m6 { export var y = 2; }
//import m6 = require('');
