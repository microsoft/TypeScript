// @declaration: true

module X.A.C {
    export interface Z {
    }
}
module X.A.B.C {
    export class W implements X.A.C.Z { // This needs to be referred as X.A.C.Z as A has conflict
    }
}

module X.A.B.C {
    export module A {
    }
}