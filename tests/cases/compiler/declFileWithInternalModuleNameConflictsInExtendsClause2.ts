// @declaration: true

namespace X.A.C {
    export interface Z {
    }
}
namespace X.A.B.C {
    export class W implements A.C.Z { // This can refer to it as A.C.Z
    }
}

namespace X.A.B.C {
    namespace A {
    }
}