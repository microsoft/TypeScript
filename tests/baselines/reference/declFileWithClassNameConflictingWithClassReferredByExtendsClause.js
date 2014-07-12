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
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var X;
(function (X) {
    (function (Y) {
        (function (base) {
            var W = (function (_super) {
                __extends(W, _super);
                function W() {
                    _super.apply(this, arguments);
                }
                return W;
            })(A.B.Base.W);
            base.W = W;
        })(Y.base || (Y.base = {}));
        var base = Y.base;
    })(X.Y || (X.Y = {}));
    var Y = X.Y;
})(X || (X = {}));

var X;
(function (X) {
    (function (Y) {
        (function (base) {
            (function (Z) {
                var W = (function (_super) {
                    __extends(W, _super);
                    function W() {
                        _super.apply(this, arguments);
                    }
                    return W;
                })(X.Y.base.W);
                Z.W = W;
            })(base.Z || (base.Z = {}));
            var Z = base.Z;
        })(Y.base || (Y.base = {}));
        var base = Y.base;
    })(X.Y || (X.Y = {}));
    var Y = X.Y;
})(X || (X = {}));


////[declFileWithClassNameConflictingWithClassReferredByExtendsClause.d.ts]
declare module A.B.Base {
    class W {
        public id: number;
    }
}
declare module X.Y.base {
    class W extends A.B.Base.W {
        public name: string;
    }
}
declare module X.Y.base.Z {
    class W<TValue> extends base.W {
        public value: boolean;
    }
}
