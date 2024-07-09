module T1 {
    module m3d { export var y = 2; }
    declare class m3d { constructor(foo); foo(): void ; static bar(); }
    var r = new m3d(); // error
}

module T2 {
    declare class m3d { constructor(foo); foo(): void; static bar(); }
    module m3d { export var y = 2; }
    var r = new m3d(); // error
}

module T3 {
    module m3d { export var y = 2; }
    declare class m3d { foo(): void; static bar(); }
    var r = new m3d();
    r.foo();
    r.bar(); // error
    r.y; // error
}

module T4 {
    declare class m3d { foo(): void; static bar(); }
    module m3d { export var y = 2; }
    var r = new m3d();
    r.foo();
    r.bar(); // error
    r.y; // error
}

module m3d { export var y = 2; }
declare class m3d { constructor(foo); foo(): void; static bar(); }
var r = new m3d(); // error

declare class m4d extends m3d { }
var r2 = new m4d(); // error