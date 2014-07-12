//// [implicitAnyGetAndSetAccessorWithAnyReturnType.js]
// these should be errors
var GetAndSet = (function () {
    function GetAndSet() {
        this.getAndSet = null;
    }
    Object.defineProperty(GetAndSet.prototype, "haveGetAndSet", {
        get: function () {
            return this.getAndSet;
        },
        // this shouldn't be an error
        set: function (value) {
            this.getAndSet = value;
        },
        enumerable: true,
        configurable: true
    });

    return GetAndSet;
})();

var SetterOnly = (function () {
    function SetterOnly() {
    }
    Object.defineProperty(SetterOnly.prototype, "haveOnlySet", {
        set: function (newXValue) {
        },
        enumerable: true,
        configurable: true
    });
    return SetterOnly;
})();

var GetterOnly = (function () {
    function GetterOnly() {
    }
    Object.defineProperty(GetterOnly.prototype, "haveOnlyGet", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    return GetterOnly;
})();
