// module then function
namespace m2 { }
function m2() { }; // ok since the module is not instantiated

namespace m2a { var y = 2; }
function m2a() { }; // error since the module is instantiated

namespace m2b { export var y = 2; }
function m2b() { };  // error since the module is instantiated

function m2c() { }; 
namespace m2c { export var y = 2; } 

namespace m2cc { export var y = 2; }
function m2cc() { }; // error to have module first

namespace m2d { }
declare function m2d(): void; 

declare function m2e(): void; 
namespace m2e { }

function m2f() { };
namespace m2f { export interface I { foo(): void } } 

function m2g() { };
namespace m2g { export class C { foo() { } } } 
