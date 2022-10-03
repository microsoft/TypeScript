//// [getSetEnumerable.ts]
class GetSetEnumerableClassGet {
    get prop() { return true;}
}

class GetSetEnumerableClassSet {
    set prop(value: boolean) { }
}

class GetSetEnumerableClassGetSet {
    get prop() { return true;}
    set prop(value: boolean) { }
}

const GetSetEnumerableObjectGet = {
    get prop() { return true; }
};

const GetSetEnumerableObjectSet = {
    set prop(value: boolean) { }
};

const GetSetEnumerableObjectGetSet = {
    get prop() { return true; },
    set prop(value: boolean) { }
};


//// [getSetEnumerable.js]
var GetSetEnumerableClassGet = /** @class */ (function () {
    function GetSetEnumerableClassGet() {
    }
    Object.defineProperty(GetSetEnumerableClassGet.prototype, "prop", {
        get: function () { return true; },
        enumerable: false,
        configurable: true
    });
    return GetSetEnumerableClassGet;
}());
var GetSetEnumerableClassSet = /** @class */ (function () {
    function GetSetEnumerableClassSet() {
    }
    Object.defineProperty(GetSetEnumerableClassSet.prototype, "prop", {
        set: function (value) { },
        enumerable: false,
        configurable: true
    });
    return GetSetEnumerableClassSet;
}());
var GetSetEnumerableClassGetSet = /** @class */ (function () {
    function GetSetEnumerableClassGetSet() {
    }
    Object.defineProperty(GetSetEnumerableClassGetSet.prototype, "prop", {
        get: function () { return true; },
        set: function (value) { },
        enumerable: false,
        configurable: true
    });
    return GetSetEnumerableClassGetSet;
}());
var GetSetEnumerableObjectGet = {
    get prop() { return true; }
};
var GetSetEnumerableObjectSet = {
    set prop(value) { }
};
var GetSetEnumerableObjectGetSet = {
    get prop() { return true; },
    set prop(value) { }
};
