namespace M {
    export interface I { }
}
namespace M {
    export class I { }
}

namespace M {
    export function f() { }
}
namespace M {
    export class f { } // error
}

namespace M {
    function g() { }
}
namespace M {
    export class g { } // no error
}

namespace M {
    export class C { }
}
namespace M {
    function C() { } // no error
}

namespace M {
    export var v = 3;
}
namespace M {
    export var v = 3; // error for redeclaring var in a different parent
}

class Foo {
    static x: number;
}

namespace Foo {
    export var x: number; // error for redeclaring var in a different parent
}

namespace N {
    export namespace F {
        var t;
    }
}
declare namespace N {
    export function F(); // no error because function is ambient
}
