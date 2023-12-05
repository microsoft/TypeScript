//// [tests/cases/compiler/unspecializedConstraints.ts] ////

//// [unspecializedConstraints.ts]
module ts {
    interface Map<T> {
        [index: string]: T;
    }

    interface Equals<T> {
        equals(other: T): boolean;
    }

    class Symbol {
    }

    class Type extends Symbol {
        equals(that: Type): boolean {
            if (this === that) return true;
            if (!(this.isObjectType() && that.isObjectType())) return false;
            var propCount = that.getPropertyCount();
            if (propCount !== this.getPropertyCount()) return false;
            var sigCount = that.getSignatureCount();
            if (sigCount !== this.getSignatureCount()) return false;
            if (propCount) {
                for (var i = 0; i < propCount; i++) {
                    var thisProp = this.getProperty(i);
                    var thatProp = that.getPropertyByName(thisProp.name);
                    if (!(thatProp && thisProp.flags === thatProp.flags && thisProp.type.equals(thatProp.type))) return false;
                }
            }
            if (sigCount) {
                if (!setEquals(this.getSignatures(), that.getSignatures())) return false;
            }
            return true;
        }
        getProperties(): Property[] {
            return [];
        }
        getProperty(index: number): Property {
            return undefined;
        }
        getPropertyByName(name: string): Property {
            return undefined;
        }
        getPropertyCount(): number {
            return 0;
        }
        getSignature(index: number): Signature {
            return undefined;
        }
        getSignatureCount(): number {
            return 0;
        }
        getSignatures(): Signature[] {
            return [];
        }
        isPrimitive(): boolean {
            return false;
        }
        isObjectType(): boolean {
            return false;
        }
        isTypeParameter(): boolean {
            return false;
        }
        isSubTypeOf(type: Type) {
        }
    }

    class Property extends Symbol {
        constructor(public name: string, public type: Type, public flags: PropertyFlags) {
            super();
        }
        equals(other: Property): boolean {
            return this.name === other.name &&
                this.flags === other.flags &&
                this.type.equals(other.type);
        }
    }

    enum PropertyFlags {
        Optional = 1,
        Private = 2
    }

    class Signature extends Symbol {
        constructor(public typeParameters: TypeParameter[], public parameters: Parameter[], public returnType: Type) {
            super();
        }
        equalsNoReturn(other: Signature): boolean {
            return this.parameters.length === other.parameters.length &&
                this.typeParameters.length === other.typeParameters.length &&
                arrayEquals(this.parameters, other.parameters) &&
                arrayEquals(this.typeParameters, other.typeParameters);
        }
        equals(other: Signature): boolean {
            return this.equalsNoReturn(other) &&
                this.returnType.equals(other.returnType);
        }
    }

    class Parameter extends Symbol {
        constructor(public name: string, public type: Type, public flags: ParameterFlags) {
            super();
        }
        equals(other: Parameter) {
            return this.name === other.name &&
                this.flags === other.flags &&
                this.type.equals(other.type);
        }
    }

    enum ParameterFlags {
        Optional = 1,
        Rest = 2
    }

   
    var hasOwnProperty = Object.prototype.hasOwnProperty;

    function getProperty<T>(map: Map<T>, key: string): T {
        if (!hasOwnProperty.call(map, key)) return undefined;
        return map[key];
    }

    function hasProperty<T>(map: Map<T>, key: string): boolean {
        return hasOwnProperty.call(map, key);
    }

    function arrayContains<T extends Equals<T>>(a: T[], item: T): boolean {
        var len = a.length;
        for (var i = 0; i < len; i++) {
            if (item.equals(a[i])) return true;
        }
        return false;
    }

    function arrayEquals<T extends Equals<T>>(a: T[], b: T[]): boolean {
        var len = a.length;
        if (b.length !== len) return false;
        for (var i = 0; i < len; i++) {
            if (!a[i].equals(b[i])) return false;
        }
        return true;
    }

    function setEquals<T extends Equals<T>>(a: T[], b: T[]): boolean {
        var len = a.length;
        if (b.length !== len) return false;
        for (var i = 0; i < len; i++) {
            if (!arrayContains(b, a[i])) return false;
        }
        return true;
    }
}


//// [unspecializedConstraints.js]
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
var ts;
(function (ts) {
    var Symbol = /** @class */ (function () {
        function Symbol() {
        }
        return Symbol;
    }());
    var Type = /** @class */ (function (_super) {
        __extends(Type, _super);
        function Type() {
            return _super !== null && _super.apply(this, arguments) || this;
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
    }(Symbol));
    var Property = /** @class */ (function (_super) {
        __extends(Property, _super);
        function Property(name, type, flags) {
            var _this = _super.call(this) || this;
            _this.name = name;
            _this.type = type;
            _this.flags = flags;
            return _this;
        }
        Property.prototype.equals = function (other) {
            return this.name === other.name &&
                this.flags === other.flags &&
                this.type.equals(other.type);
        };
        return Property;
    }(Symbol));
    var PropertyFlags;
    (function (PropertyFlags) {
        PropertyFlags[PropertyFlags["Optional"] = 1] = "Optional";
        PropertyFlags[PropertyFlags["Private"] = 2] = "Private";
    })(PropertyFlags || (PropertyFlags = {}));
    var Signature = /** @class */ (function (_super) {
        __extends(Signature, _super);
        function Signature(typeParameters, parameters, returnType) {
            var _this = _super.call(this) || this;
            _this.typeParameters = typeParameters;
            _this.parameters = parameters;
            _this.returnType = returnType;
            return _this;
        }
        Signature.prototype.equalsNoReturn = function (other) {
            return this.parameters.length === other.parameters.length &&
                this.typeParameters.length === other.typeParameters.length &&
                arrayEquals(this.parameters, other.parameters) &&
                arrayEquals(this.typeParameters, other.typeParameters);
        };
        Signature.prototype.equals = function (other) {
            return this.equalsNoReturn(other) &&
                this.returnType.equals(other.returnType);
        };
        return Signature;
    }(Symbol));
    var Parameter = /** @class */ (function (_super) {
        __extends(Parameter, _super);
        function Parameter(name, type, flags) {
            var _this = _super.call(this) || this;
            _this.name = name;
            _this.type = type;
            _this.flags = flags;
            return _this;
        }
        Parameter.prototype.equals = function (other) {
            return this.name === other.name &&
                this.flags === other.flags &&
                this.type.equals(other.type);
        };
        return Parameter;
    }(Symbol));
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
