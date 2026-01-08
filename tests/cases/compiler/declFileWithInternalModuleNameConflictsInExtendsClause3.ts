// @declaration: true

namespace X.A.C {
    export interface Z {
    }
}
namespace X.A.B.C {
    export class W implements X.A.C.Z { // This needs to be referred as X.A.C.Z as A has conflict
    }
}

namespace X.A.B.C {
    export namespace A {
    }
}