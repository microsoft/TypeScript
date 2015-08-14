// @target: ES5
// @declaration: true

namespace M {
    export interface I { }
}

namespace N {
    export function getI(): M.I {
        return undefined
    }
}

namespace O {
    // shadow M with a local namespace declaration
    export namespace M {
        export var x = 0;
    }

    // Error, return type cannot be named
    export function getIlocally() {
        return N.getI();
    }
}
