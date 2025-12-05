namespace T1 {
    namespace m3d { export var y = 2; }
    declare class m3d { constructor(foo); foo(): void ; static bar(); }
    var r = new m3d(); // error
}

namespace T2 {
    declare class m3d { constructor(foo); foo(): void; static bar(); }
    namespace m3d { export var y = 2; }
    var r = new m3d(); // error
}

namespace T3 {
    namespace m3d { export var y = 2; }
    declare class m3d { foo(): void; static bar(); }
    var r = new m3d();
    r.foo();
    r.bar(); // error
    r.y; // error
}

namespace T4 {
    declare class m3d { foo(): void; static bar(); }
    namespace m3d { export var y = 2; }
    var r = new m3d();
    r.foo();
    r.bar(); // error
    r.y; // error
}

namespace m3d { export var y = 2; }
declare class m3d { constructor(foo); foo(): void; static bar(); }
var r = new m3d(); // error

declare class m4d extends m3d { }
var r2 = new m4d(); // error