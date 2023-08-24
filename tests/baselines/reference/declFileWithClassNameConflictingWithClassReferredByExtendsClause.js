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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var X;
(function (X) {
    var Y;
    (function (Y) {
        var base;
        (function (base) {
            var W = /** @class */ (function (_super) {
                __extends(W, _super);
                function W() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return W;
            }(A.B.Base.W));
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
                var W = /** @class */ (function (_super) {
                    __extends(W, _super);
                    function W() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    return W;
                }(X.Y.base.W));
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
