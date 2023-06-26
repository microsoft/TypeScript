//// [tests/cases/compiler/implicitAnyGetAndSetAccessorWithAnyReturnType.ts] ////

//// [implicitAnyGetAndSetAccessorWithAnyReturnType.ts]
// these should be errors
class GetAndSet {
    getAndSet = null;             // error at "getAndSet"
    public get haveGetAndSet() {  // this should not be an error
        return this.getAndSet;
    }
    
    // this shouldn't be an error
    public set haveGetAndSet(value) {  // error at "value"
        this.getAndSet = value;
    }
}

class SetterOnly {
    public set haveOnlySet(newXValue) {  // error at "haveOnlySet, newXValue"
    }
}

class GetterOnly {
    public get haveOnlyGet() {  // error at "haveOnlyGet"
        return null;
    }
}

//// [implicitAnyGetAndSetAccessorWithAnyReturnType.js]
// these should be errors
var GetAndSet = /** @class */ (function () {
    function GetAndSet() {
        this.getAndSet = null; // error at "getAndSet"
    }
    Object.defineProperty(GetAndSet.prototype, "haveGetAndSet", {
        get: function () {
            return this.getAndSet;
        },
        // this shouldn't be an error
        set: function (value) {
            this.getAndSet = value;
        },
        enumerable: false,
        configurable: true
    });
    return GetAndSet;
}());
var SetterOnly = /** @class */ (function () {
    function SetterOnly() {
    }
    Object.defineProperty(SetterOnly.prototype, "haveOnlySet", {
        set: function (newXValue) {
        },
        enumerable: false,
        configurable: true
    });
    return SetterOnly;
}());
var GetterOnly = /** @class */ (function () {
    function GetterOnly() {
    }
    Object.defineProperty(GetterOnly.prototype, "haveOnlyGet", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    return GetterOnly;
}());
