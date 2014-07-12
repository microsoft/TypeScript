//// [unspecializedConstraints.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ts;
(function (ts) {
    var Symbol = (function () {
        function Symbol() {
        }
        return Symbol;
    })();

    var Type = (function (_super) {
        __extends(Type, _super);
        function Type() {
            _super.apply(this, arguments);
        }
        Type.prototype.equals = function (that) {
            if (this === that)
                return true;
            if (!(this.isObjectType() && that.isObjectType()))
                return false;
            var propCount = that.getPropertyCount();
            if (propCount !== this.getPropertyCount())
                return false;
            var sigCount = that.getSignatureCount();
            if (sigCount !== this.getSignatureCount())
                return false;
            if (propCount) {
                for (var i = 0; i < propCount; i++) {
                    var thisProp = this.getProperty(i);
                    var thatProp = that.getPropertyByName(thisProp.name);
                    if (!(thatProp && thisProp.flags === thatProp.flags && thisProp.type.equals(thatProp.type)))
                        return false;
                }
            }
            if (sigCount) {
                if (!setEquals(this.getSignatures(), that.getSignatures()))
                    return false;
            }
            return true;
        };
        Type.prototype.getProperties = function () {
            return [];
        };
        Type.prototype.getProperty = function (index) {
            return undefined;
        };
        Type.prototype.getPropertyByName = function (name) {
            return undefined;
        };
        Type.prototype.getPropertyCount = function () {
            return 0;
        };
        Type.prototype.getSignature = function (index) {
            return undefined;
        };
        Type.prototype.getSignatureCount = function () {
            return 0;
        };
        Type.prototype.getSignatures = function () {
            return [];
        };
        Type.prototype.isPrimitive = function () {
            return false;
        };
        Type.prototype.isObjectType = function () {
            return false;
        };
        Type.prototype.isTypeParameter = function () {
            return false;
        };
        Type.prototype.isSubTypeOf = function (type) {
        };
        return Type;
    })(Symbol);

    var Property = (function (_super) {
        __extends(Property, _super);
        function Property(name, type, flags) {
            _super.call(this);
            this.name = name;
            this.type = type;
            this.flags = flags;
        }
        Property.prototype.equals = function (other) {
            return this.name === other.name && this.flags === other.flags && this.type.equals(other.type);
        };
        return Property;
    })(Symbol);

    var PropertyFlags;
    (function (PropertyFlags) {
        PropertyFlags[PropertyFlags["Optional"] = 1] = "Optional";
        PropertyFlags[PropertyFlags["Private"] = 2] = "Private";
    })(PropertyFlags || (PropertyFlags = {}));

    var Signature = (function (_super) {
        __extends(Signature, _super);
        function Signature(typeParameters, parameters, returnType) {
            _super.call(this);
            this.typeParameters = typeParameters;
            this.parameters = parameters;
            this.returnType = returnType;
        }
        Signature.prototype.equalsNoReturn = function (other) {
            return this.parameters.length === other.parameters.length && this.typeParameters.length === other.typeParameters.length && arrayEquals(this.parameters, other.parameters) && arrayEquals(this.typeParameters, other.typeParameters);
        };
        Signature.prototype.equals = function (other) {
            return this.equalsNoReturn(other) && this.returnType.equals(other.returnType);
        };
        return Signature;
    })(Symbol);

    var Parameter = (function (_super) {
        __extends(Parameter, _super);
        function Parameter(name, type, flags) {
            _super.call(this);
            this.name = name;
            this.type = type;
            this.flags = flags;
        }
        Parameter.prototype.equals = function (other) {
            return this.name === other.name && this.flags === other.flags && this.type.equals(other.type);
        };
        return Parameter;
    })(Symbol);

    var ParameterFlags;
    (function (ParameterFlags) {
        ParameterFlags[ParameterFlags["Optional"] = 1] = "Optional";
        ParameterFlags[ParameterFlags["Rest"] = 2] = "Rest";
    })(ParameterFlags || (ParameterFlags = {}));

    var hasOwnProperty = Object.prototype.hasOwnProperty;

    function getProperty(map, key) {
        if (!hasOwnProperty.call(map, key))
            return undefined;
        return map[key];
    }

    function hasProperty(map, key) {
        return hasOwnProperty.call(map, key);
    }

    function arrayContains(a, item) {
        var len = a.length;
        for (var i = 0; i < len; i++) {
            if (item.equals(a[i]))
                return true;
        }
        return false;
    }

    function arrayEquals(a, b) {
        var len = a.length;
        if (b.length !== len)
            return false;
        for (var i = 0; i < len; i++) {
            if (!a[i].equals(b[i]))
                return false;
        }
        return true;
    }

    function setEquals(a, b) {
        var len = a.length;
        if (b.length !== len)
            return false;
        for (var i = 0; i < len; i++) {
            if (!arrayContains(b, a[i]))
                return false;
        }
        return true;
    }
})(ts || (ts = {}));
