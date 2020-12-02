//// [derivedClassSuperStatementPosition.ts]
class DerivedBasic extends Object {
    prop = 1;
    constructor() {
        super();
    }
}

class DerivedInConditional extends Object {
    prop = 1;
    constructor() {
        Math.random()
            ? super(1)
            : super(0);
    }
}

class DerivedInIf extends Object {
    prop = 1;
    constructor() {
        if (Math.random()) {
            super(1);
        }
        else {
            super(0);
        }
    }
}

class DerivedInBlockWithProperties extends Object {
    prop = 1;
    constructor(private paramProp = 2) {
        {
            super();
        }
    }
}

class DerivedInConditionalWithProperties extends Object {
    prop = 1;
    constructor(private paramProp = 2) {
        if (Math.random()) {
            super(1);
        } else {
            super(0);
        }
    }
}


//// [derivedClassSuperStatementPosition.js]
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
var DerivedBasic = /** @class */ (function (_super) {
    __extends(DerivedBasic, _super);
    function DerivedBasic() {
        var _this = _super.call(this) || this;
        _this.prop = 1;
        return _this;
    }
    return DerivedBasic;
}(Object));
var DerivedInConditional = /** @class */ (function (_super) {
    __extends(DerivedInConditional, _super);
    function DerivedInConditional() {
        var _this = this;
        _this.prop = 1;
        Math.random()
            ? _this = _super.call(this, 1) || this : _this = _super.call(this, 0) || this;
        return _this;
    }
    return DerivedInConditional;
}(Object));
var DerivedInIf = /** @class */ (function (_super) {
    __extends(DerivedInIf, _super);
    function DerivedInIf() {
        var _this = this;
        _this.prop = 1;
        if (Math.random()) {
            _this = _super.call(this, 1) || this;
        }
        else {
            _this = _super.call(this, 0) || this;
        }
        return _this;
    }
    return DerivedInIf;
}(Object));
var DerivedInBlockWithProperties = /** @class */ (function (_super) {
    __extends(DerivedInBlockWithProperties, _super);
    function DerivedInBlockWithProperties(paramProp) {
        if (paramProp === void 0) { paramProp = 2; }
        var _this = this;
        _this.paramProp = paramProp;
        _this.prop = 1;
        {
            _this = _super.call(this) || this;
        }
        return _this;
    }
    return DerivedInBlockWithProperties;
}(Object));
var DerivedInConditionalWithProperties = /** @class */ (function (_super) {
    __extends(DerivedInConditionalWithProperties, _super);
    function DerivedInConditionalWithProperties(paramProp) {
        if (paramProp === void 0) { paramProp = 2; }
        var _this = this;
        _this.paramProp = paramProp;
        _this.prop = 1;
        if (Math.random()) {
            _this = _super.call(this, 1) || this;
        }
        else {
            _this = _super.call(this, 0) || this;
        }
        return _this;
    }
    return DerivedInConditionalWithProperties;
}(Object));
