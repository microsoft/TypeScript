//// [thisInAccessors.ts]
// this capture only in getter
class GetterOnly {
    get Value() {
        var fn = () => this;
        return '';
    }
    set Value(val) {
    }
}

// this capture only in setter
class SetterOnly {
    get Value() {
        return '';
    }
    set Value(val) {
        var fn = () => this;
    }
}

// this capture only in both setter and getter
class GetterAndSetter {
    get Value() {
        var fn = () => this;
        return '';
    }
    set Value(val) {
        var fn = () => this;
    }
}

//// [thisInAccessors.js]
// this capture only in getter
var GetterOnly = /** @class */ (function () {
    function GetterOnly() {
    }
    Object.defineProperty(GetterOnly.prototype, "Value", {
        get: function () {
            var _this = this;
            var fn = function () { return _this; };
            return '';
        },
        set: function (val) {
        },
        enumerable: false,
        configurable: true
    });
    return GetterOnly;
}());
// this capture only in setter
var SetterOnly = /** @class */ (function () {
    function SetterOnly() {
    }
    Object.defineProperty(SetterOnly.prototype, "Value", {
        get: function () {
            return '';
        },
        set: function (val) {
            var _this = this;
            var fn = function () { return _this; };
        },
        enumerable: false,
        configurable: true
    });
    return SetterOnly;
}());
// this capture only in both setter and getter
var GetterAndSetter = /** @class */ (function () {
    function GetterAndSetter() {
    }
    Object.defineProperty(GetterAndSetter.prototype, "Value", {
        get: function () {
            var _this = this;
            var fn = function () { return _this; };
            return '';
        },
        set: function (val) {
            var _this = this;
            var fn = function () { return _this; };
        },
        enumerable: false,
        configurable: true
    });
    return GetterAndSetter;
}());
