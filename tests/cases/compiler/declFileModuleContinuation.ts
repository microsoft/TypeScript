// @declaration: true
module A.C {
    export interface Z {
    }
}

module A.B.C {
    export class W implements A.C.Z {
    }
}