// @target: es2015
// @declaration: true
namespace A.C {
    export interface Z {
    }
}

namespace A.B.C {
    export class W implements A.C.Z {
    }
}