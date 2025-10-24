//@module: commonjs
namespace M {
    export interface E { }
    interface I { }
}
namespace M {
    export interface E { } // ok
    interface I { } // ok
}

// Doesn't match export visibility, but it's in a different parent, so it's ok
namespace M {
    interface E { } // ok
    export interface I { } // ok
}

namespace N {
    interface I { }
    interface I { } // ok
    export interface E { }
    export interface E { } // ok
}

namespace N2 {
    interface I { }
    export interface I { } // error
    export interface E { }
    interface E { } // error
}

// Should report error only once for instantiated module
namespace M {
    namespace inst {
        var t;
    }
    export namespace inst { // one error
        var t;
    }
}

// Variables of the same / different type
namespace M2 {
    var v: string;
    export var v: string; // one error (visibility)
    var w: number;
    export var w: string; // two errors (visibility and type mismatch)
}

namespace M {
    namespace F {
        var t;
    }
    export function F() { } // Only one error for duplicate identifier (don't consider visibility)
}

namespace M {
    class C { }
    namespace C { }
    export namespace C { // Two visibility errors (one for the clodule symbol, and one for the merged container symbol)
        var t;
    }
}

// Top level
interface D { }
export interface D { }