//// [tests/cases/compiler/augmentedTypesModules3b.ts] ////

//// [augmentedTypesModules3b.ts]
class m3b { foo() { } }
module m3b { var y = 2; }

class m3c { foo() { } }
module m3c { export var y = 2; } 

declare class m3d { foo(): void }
module m3d { export var y = 2; } 

module m3e { export var y = 2; } 
declare class m3e { foo(): void } 

declare class m3f { foo(): void }
module m3f { export interface I { foo(): void } }

declare class m3g { foo(): void }
module m3g { export class C { foo() { } } }


//// [augmentedTypesModules3b.js]
class m3b {
    foo() { }
}
(function (m3b) {
    var y = 2;
})(m3b || (m3b = {}));
class m3c {
    foo() { }
}
(function (m3c) {
    m3c.y = 2;
})(m3c || (m3c = {}));
var m3d;
(function (m3d) {
    m3d.y = 2;
})(m3d || (m3d = {}));
var m3e;
(function (m3e) {
    m3e.y = 2;
})(m3e || (m3e = {}));
var m3g;
(function (m3g) {
    class C {
        foo() { }
    }
    m3g.C = C;
})(m3g || (m3g = {}));
