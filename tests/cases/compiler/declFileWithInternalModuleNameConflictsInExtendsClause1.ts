// @declaration: true

module X.A.C {
    export interface Z {
    }
}
module X.A.B.C {
    module A {
    }
    export class W implements X.A.C.Z { // This needs to be refered as X.A.C.Z as A has conflict
    }
}