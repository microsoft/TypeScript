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
    var Y;
    (function (Y) {
        var base;
        (function (base) {
            class W extends A.B.Base.W {
            }
            base.W = W;
        })(base = Y.base || (Y.base = {}));
    })(Y = X.Y || (X.Y = {}));
})(X || (X = {}));
(function (X) {
    var Y;
    (function (Y) {
        var base;
        (function (base) {
            var Z;
            (function (Z) {
                class W extends X.Y.base.W {
                }
                Z.W = W;
            })(Z = base.Z || (base.Z = {}));
        })(base = Y.base || (Y.base = {}));
    })(Y = X.Y || (X.Y = {}));
})(X || (X = {}));


//// [declFileWithClassNameConflictingWithClassReferredByExtendsClause.d.ts]
declare namespace A.B.Base {
    class W {
        id: number;
    }
}
declare namespace X.Y.base {
    class W extends A.B.Base.W {
        name: string;
    }
}
declare namespace X.Y.base.Z {
    class W<TValue> extends X.Y.base.W {
        value: boolean;
    }
}
