//// [derivedClassSuperProperties.ts]
class Base {
    constructor(a?) { }

    receivesAnything(param?) { }
}

class Derived1 extends Base {
    prop = true;
    constructor() {
        super.receivesAnything();
        super();
    }
}

class Derived2 extends Base {
    prop = true;
    constructor() {
        super.receivesAnything(this);
        super();
    }
}

class Derived3 extends Base {
    prop = true;
    constructor() {
        super.receivesAnything();
        super(this);
    }
}

class Derived4 extends Base {
    prop = true;
    constructor() {
        super.receivesAnything(this);
        super(this);
    }
}

class Derived5 extends Base {
    prop = true;
    constructor() {
        super();
        super.receivesAnything();
    }
}

class Derived6 extends Base {
    prop = true;
    constructor() {
        super(this);
        super.receivesAnything();
    }
}

class Derived7 extends Base {
    prop = true;
    constructor() {
        super();
        super.receivesAnything(this);
    }
}

class Derived8 extends Base {
    prop = true;
    constructor() {
        super(this);
        super.receivesAnything(this);
    }
}

class DerivedWithArrowFunction extends Base {
    prop = true;
    constructor() {
        (() => this)();
        super();
    }
}

class DerivedWithFunctionDeclaration extends Base {
    prop = true;
    constructor() {
        function declaration() {
            return this;
        }
        super();
    }
}

class DerivedWithFunctionDeclarationAndThisParam extends Base {
    prop = true;
    constructor() {
        function declaration(param = this) {
            return param;
        }
        super();
    }
}

class DerivedWithFunctionExpression extends Base {
    prop = true;
    constructor() {
        (function () {
            return this;
        })();
        super();
    }
}

class DerivedWithClassExpression extends Base {
    prop = true;
    constructor() {
        console.log(class { });
        super();
    }
}

class DerivedWithDerivedClassExpression extends Base {
    prop = true;
    constructor() {
        console.log(class extends Base {
            constructor() {
                super();
            }
        });
        super();
    }
}

class DerivedWithNewDerivedClassExpression extends Base {
    prop = true;
    constructor() {
        console.log(new class extends Base {
            constructor() {
                super();
            }
        }());
        super();
    }
}

class DerivedWithObjectAccessors extends Base {
    prop = true;
    constructor() {
        const obj = {
            get prop() {
                return true;
            },
            set prop(param) {
                this._prop = param;
            }
        };
        super();
    }
}

class DerivedWithObjectAccessorsUsingThis extends Base {
    propName = "prop";
    constructor() {
        const obj = {
            get [this.propName]() {
                return true;
            },
            set [this.propName](param) {
                this._prop = param;
            }
        };
        super();
    }
}

class DerivedWithObjectComputedPropertyName extends Base {
    propName = "prop";
    constructor() {
        const obj = {
            [this.propName]: true,
        };
        super();
    }
}

class DerivedWithObjectMethod extends Base {
    prop = true;
    constructor() {
        const obj = {
            getProp() {
                return this;
            },
        };
        super();
    }
}


//// [derivedClassSuperProperties.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Base = /** @class */ (function () {
    function Base(a) {
    }
    Base.prototype.receivesAnything = function (param) { };
    return Base;
}());
var Derived1 = /** @class */ (function (_super) {
    __extends(Derived1, _super);
    function Derived1() {
        var _this = this;
        _this.prop = true;
        _super.prototype.receivesAnything.call(_this);
        _this = _super.call(this) || this;
        return _this;
    }
    return Derived1;
}(Base));
var Derived2 = /** @class */ (function (_super) {
    __extends(Derived2, _super);
    function Derived2() {
        var _this = this;
        _this.prop = true;
        _super.prototype.receivesAnything.call(_this, _this);
        _this = _super.call(this) || this;
        return _this;
    }
    return Derived2;
}(Base));
var Derived3 = /** @class */ (function (_super) {
    __extends(Derived3, _super);
    function Derived3() {
        var _this = this;
        _this.prop = true;
        _super.prototype.receivesAnything.call(_this);
        _this = _super.call(this, _this) || this;
        return _this;
    }
    return Derived3;
}(Base));
var Derived4 = /** @class */ (function (_super) {
    __extends(Derived4, _super);
    function Derived4() {
        var _this = this;
        _this.prop = true;
        _super.prototype.receivesAnything.call(_this, _this);
        _this = _super.call(this, _this) || this;
        return _this;
    }
    return Derived4;
}(Base));
var Derived5 = /** @class */ (function (_super) {
    __extends(Derived5, _super);
    function Derived5() {
        var _this = _super.call(this) || this;
        _this.prop = true;
        _super.prototype.receivesAnything.call(_this);
        return _this;
    }
    return Derived5;
}(Base));
var Derived6 = /** @class */ (function (_super) {
    __extends(Derived6, _super);
    function Derived6() {
        var _this = _super.call(this, _this) || this;
        _this.prop = true;
        _super.prototype.receivesAnything.call(_this);
        return _this;
    }
    return Derived6;
}(Base));
var Derived7 = /** @class */ (function (_super) {
    __extends(Derived7, _super);
    function Derived7() {
        var _this = _super.call(this) || this;
        _this.prop = true;
        _super.prototype.receivesAnything.call(_this, _this);
        return _this;
    }
    return Derived7;
}(Base));
var Derived8 = /** @class */ (function (_super) {
    __extends(Derived8, _super);
    function Derived8() {
        var _this = _super.call(this, _this) || this;
        _this.prop = true;
        _super.prototype.receivesAnything.call(_this, _this);
        return _this;
    }
    return Derived8;
}(Base));
var DerivedWithArrowFunction = /** @class */ (function (_super) {
    __extends(DerivedWithArrowFunction, _super);
    function DerivedWithArrowFunction() {
        var _this = this;
        _this.prop = true;
        (function () { return _this; })();
        _this = _super.call(this) || this;
        return _this;
    }
    return DerivedWithArrowFunction;
}(Base));
var DerivedWithFunctionDeclaration = /** @class */ (function (_super) {
    __extends(DerivedWithFunctionDeclaration, _super);
    function DerivedWithFunctionDeclaration() {
        var _this = this;
        _this.prop = true;
        function declaration() {
            return this;
        }
        _this = _super.call(this) || this;
        return _this;
    }
    return DerivedWithFunctionDeclaration;
}(Base));
var DerivedWithFunctionDeclarationAndThisParam = /** @class */ (function (_super) {
    __extends(DerivedWithFunctionDeclarationAndThisParam, _super);
    function DerivedWithFunctionDeclarationAndThisParam() {
        var _this = this;
        _this.prop = true;
        function declaration(param) {
            if (param === void 0) { param = this; }
            return param;
        }
        _this = _super.call(this) || this;
        return _this;
    }
    return DerivedWithFunctionDeclarationAndThisParam;
}(Base));
var DerivedWithFunctionExpression = /** @class */ (function (_super) {
    __extends(DerivedWithFunctionExpression, _super);
    function DerivedWithFunctionExpression() {
        var _this = this;
        _this.prop = true;
        (function () {
            return this;
        })();
        _this = _super.call(this) || this;
        return _this;
    }
    return DerivedWithFunctionExpression;
}(Base));
var DerivedWithClassExpression = /** @class */ (function (_super) {
    __extends(DerivedWithClassExpression, _super);
    function DerivedWithClassExpression() {
        var _this = this;
        _this.prop = true;
        console.log(/** @class */ (function () {
            function class_1() {
            }
            return class_1;
        }()));
        _this = _super.call(this) || this;
        return _this;
    }
    return DerivedWithClassExpression;
}(Base));
var DerivedWithDerivedClassExpression = /** @class */ (function (_super) {
    __extends(DerivedWithDerivedClassExpression, _super);
    function DerivedWithDerivedClassExpression() {
        var _this = this;
        _this.prop = true;
        console.log(/** @class */ (function (_super) {
            __extends(class_2, _super);
            function class_2() {
                return _super.call(this) || this;
            }
            return class_2;
        }(Base)));
        _this = _super.call(this) || this;
        return _this;
    }
    return DerivedWithDerivedClassExpression;
}(Base));
var DerivedWithNewDerivedClassExpression = /** @class */ (function (_super) {
    __extends(DerivedWithNewDerivedClassExpression, _super);
    function DerivedWithNewDerivedClassExpression() {
        var _this = this;
        _this.prop = true;
        console.log(new /** @class */ (function (_super) {
            __extends(class_3, _super);
            function class_3() {
                return _super.call(this) || this;
            }
            return class_3;
        }(Base))());
        _this = _super.call(this) || this;
        return _this;
    }
    return DerivedWithNewDerivedClassExpression;
}(Base));
var DerivedWithObjectAccessors = /** @class */ (function (_super) {
    __extends(DerivedWithObjectAccessors, _super);
    function DerivedWithObjectAccessors() {
        var _this = this;
        _this.prop = true;
        var obj = {
            get prop() {
                return true;
            },
            set prop(param) {
                this._prop = param;
            }
        };
        _this = _super.call(this) || this;
        return _this;
    }
    return DerivedWithObjectAccessors;
}(Base));
var DerivedWithObjectAccessorsUsingThis = /** @class */ (function (_super) {
    __extends(DerivedWithObjectAccessorsUsingThis, _super);
    function DerivedWithObjectAccessorsUsingThis() {
        var _a;
        var _this = this;
        _this.propName = "prop";
        var obj = (_a = {},
            Object.defineProperty(_a, _this.propName, {
                get: function () {
                    return true;
                },
                enumerable: true,
                configurable: true
            }),
            Object.defineProperty(_a, _this.propName, {
                set: function (param) {
                    this._prop = param;
                },
                enumerable: true,
                configurable: true
            }),
            _a);
        _this = _super.call(this) || this;
        return _this;
    }
    return DerivedWithObjectAccessorsUsingThis;
}(Base));
var DerivedWithObjectComputedPropertyName = /** @class */ (function (_super) {
    __extends(DerivedWithObjectComputedPropertyName, _super);
    function DerivedWithObjectComputedPropertyName() {
        var _a;
        var _this = this;
        _this.propName = "prop";
        var obj = (_a = {},
            _a[_this.propName] = true,
            _a);
        _this = _super.call(this) || this;
        return _this;
    }
    return DerivedWithObjectComputedPropertyName;
}(Base));
var DerivedWithObjectMethod = /** @class */ (function (_super) {
    __extends(DerivedWithObjectMethod, _super);
    function DerivedWithObjectMethod() {
        var _this = this;
        _this.prop = true;
        var obj = {
            getProp: function () {
                return this;
            },
        };
        _this = _super.call(this) || this;
        return _this;
    }
    return DerivedWithObjectMethod;
}(Base));
