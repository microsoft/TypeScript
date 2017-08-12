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
var GetAndSet = (function () {
    function GetAndSet() {
        this.getAndSet = null; // error at "getAndSet"
    }
    var proto_1 = GetAndSet.prototype;
    Object.defineProperty(proto_1, "haveGetAndSet", {
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
}());
var SetterOnly = (function () {
    function SetterOnly() {
    }
    var proto_2 = SetterOnly.prototype;
    Object.defineProperty(proto_2, "haveOnlySet", {
        set: function (newXValue) {
        },
        enumerable: true,
        configurable: true
    });
    return SetterOnly;
}());
var GetterOnly = (function () {
    function GetterOnly() {
    }
    var proto_3 = GetterOnly.prototype;
    Object.defineProperty(proto_3, "haveOnlyGet", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    return GetterOnly;
}());
