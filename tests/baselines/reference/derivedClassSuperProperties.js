//// [derivedClassSuperProperties.ts]
class Base {
    constructor(a?) { }

    receivesAnything(param?) { }
}

class Derived1 extends Base {
    constructor() {
        super.receivesAnything();
        super();
    }
}

class Derived2 extends Base {
    constructor() {
        super.receivesAnything(this);
        super();
    }
}

class Derived3 extends Base {
    constructor() {
        super.receivesAnything();
        super(this);
    }
}

class Derived4 extends Base {
    constructor() {
        super.receivesAnything(this);
        super(this);
    }
}

class Derived5 extends Base {
    constructor() {
        super();
        super.receivesAnything();
    }
}

class Derived6 extends Base {
    constructor() {
        super(this);
        super.receivesAnything();
    }
}

class Derived7 extends Base {
    constructor() {
        super();
        super.receivesAnything(this);
    }
}

class Derived8 extends Base {
    constructor() {
        super(this);
        super.receivesAnything(this);
    }
}

class DerivedWithFunction extends Base {
    constructor() {
        (function () {
            return this;
        })();
        super();
    }
}

class DerivedWithClassExpression extends Base {
    constructor() {
        console.log(class { });
        super();
    }
}

class DerivedWithDerivedClassExpression extends Base {
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
    constructor() {
        console.log(new class extends Base {
            constructor() {
                super();
            }
        }());
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
        _super.prototype.receivesAnything.call(_this);
        return _this;
    }
    return Derived5;
}(Base));
var Derived6 = /** @class */ (function (_super) {
    __extends(Derived6, _super);
    function Derived6() {
        var _this = _super.call(this, _this) || this;
        _super.prototype.receivesAnything.call(_this);
        return _this;
    }
    return Derived6;
}(Base));
var Derived7 = /** @class */ (function (_super) {
    __extends(Derived7, _super);
    function Derived7() {
        var _this = _super.call(this) || this;
        _super.prototype.receivesAnything.call(_this, _this);
        return _this;
    }
    return Derived7;
}(Base));
var Derived8 = /** @class */ (function (_super) {
    __extends(Derived8, _super);
    function Derived8() {
        var _this = _super.call(this, _this) || this;
        _super.prototype.receivesAnything.call(_this, _this);
        return _this;
    }
    return Derived8;
}(Base));
var DerivedWithFunction = /** @class */ (function (_super) {
    __extends(DerivedWithFunction, _super);
    function DerivedWithFunction() {
        var _this = this;
        (function () {
            return this;
        })();
        _this = _super.call(this) || this;
        return _this;
    }
    return DerivedWithFunction;
}(Base));
var DerivedWithClassExpression = /** @class */ (function (_super) {
    __extends(DerivedWithClassExpression, _super);
    function DerivedWithClassExpression() {
        var _this = this;
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
