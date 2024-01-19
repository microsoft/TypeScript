// @strict: true
// @strictFunctionTypes: false

namespace first {
    export enum E { A = 1 }
}

namespace second {
    export enum E { A = 2 }
}

class Base {
    method(param: first.E) {

    }
}

class Derived extends Base {
    override method(param: second.E) {
    }
}

function overloadingFunction(): first.E
function overloadingFunction(): second.E {
    return second.E.B
}