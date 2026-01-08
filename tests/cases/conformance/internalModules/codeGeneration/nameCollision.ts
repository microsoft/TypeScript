namespace A {
    // these 2 statements force an underscore before the 'A' 
    // in the generated function call.
    var A = 12;
    var _A = '';
}

namespace B {
    var A = 12;
}

namespace B {
    // re-opened module with colliding name
    // this should add an underscore.
    class B {
        name: string;
    }
}

namespace X {
    var X = 13;
    export namespace Y {
        var Y = 13;
        export namespace Z {
            var X = 12;
            var Y = 12;
            var Z = 12;
        }
    }
}

namespace Y.Y {
    export enum Y {
        Red, Blue
    }
}

// no collision, since interface doesn't
// generate code.
namespace D {
    export interface D {
        id: number;
    }

    export var E = 'hello';
}