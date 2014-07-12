//// [genericRecursiveImplicitConstructorErrors3.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TypeScript;
(function (TypeScript) {
    var MemberName = (function () {
        function MemberName() {
        }
        MemberName.create = function (arg1, arg2, arg3) {
        };
        return MemberName;
    })();
    TypeScript.MemberName = MemberName;
})(TypeScript || (TypeScript = {}));

var TypeScript;
(function (TypeScript) {
    var PullSymbol = (function () {
        function PullSymbol() {
            this.type = null;
        }
        return PullSymbol;
    })();
    TypeScript.PullSymbol = PullSymbol;
    var PullTypeSymbol = (function (_super) {
        __extends(PullTypeSymbol, _super);
        function PullTypeSymbol() {
            _super.apply(this, arguments);
            this._elementType = null;
        }
        PullTypeSymbol.prototype.toString = function (scopeSymbol, useConstraintInName) {
            var s = this.getScopedNameEx(scopeSymbol, useConstraintInName).toString();
            return s;
        };
        PullTypeSymbol.prototype.getScopedNameEx = function (scopeSymbol, useConstraintInName, getPrettyTypeName, getTypeParamMarkerInfo) {
            if (this.isArray()) {
                var elementMemberName = this._elementType ? (this._elementType.isArray() || this._elementType.isNamedTypeSymbol() ? this._elementType.getScopedNameEx(scopeSymbol, false, getPrettyTypeName, getTypeParamMarkerInfo) : this._elementType.getMemberTypeNameEx(false, scopeSymbol, getPrettyTypeName)) : 1;
                return TypeScript.MemberName.create(elementMemberName, "", "[]");
            }
        };
        return PullTypeSymbol;
    })(PullSymbol);
    TypeScript.PullTypeSymbol = PullTypeSymbol;
})(TypeScript || (TypeScript = {}));
