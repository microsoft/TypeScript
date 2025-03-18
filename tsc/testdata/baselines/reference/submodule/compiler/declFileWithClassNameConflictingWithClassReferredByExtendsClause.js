//// [tests/cases/compiler/declFileWithClassNameConflictingWithClassReferredByExtendsClause.ts] ////

//// [declFileWithClassNameConflictingWithClassReferredByExtendsClause.ts]
declare module A.B.Base {
    export class W {
        id: number;
    }
}
module X.Y.base {

    export class W extends A.B.Base.W {
        name: string;
    }
}

module X.Y.base.Z {

    export class W<TValue> extends X.Y.base.W {
        value: boolean;
    }
}


//// [declFileWithClassNameConflictingWithClassReferredByExtendsClause.js]
var X;
(function (X) {
    let Y;
    (function (Y) {
        let base;
        (function (base) {
            class W extends A.B.Base.W {
                name;
            }
            base.W = W;
        })(base = Y.base || (Y.base = {}));
    })(Y = X.Y || (X.Y = {}));
})(X || (X = {}));
(function (X) {
    let Y;
    (function (Y) {
        let base;
        (function (base) {
            let Z;
            (function (Z) {
                class W extends X.Y.base.W {
                    value;
                }
                Z.W = W;
            })(Z = base.Z || (base.Z = {}));
        })(base = Y.base || (Y.base = {}));
    })(Y = X.Y || (X.Y = {}));
})(X || (X = {}));
