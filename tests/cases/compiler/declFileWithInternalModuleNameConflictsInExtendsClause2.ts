// @declaration: true

module X.A.C {
    export interface Z {
    }
}
module X.A.B.C {
    export class W implements A.C.Z { // This can refer to it as A.C.Z
    }
}

module X.A.B.C {
    module A {
    }
}