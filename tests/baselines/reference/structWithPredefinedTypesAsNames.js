//// [structWithPredefinedTypesAsNames.ts]
// structs cannot use predefined types as names

struct any { }
struct number { }
struct boolean { }
struct string { }

//// [structWithPredefinedTypesAsNames.js]
// structs cannot use predefined types as names
var any = (function () {
    var _any = new TypedObject.StructType({
    });
    function _ctor() {
    }
    function any() {
        var obj = new _any();
        _ctor.call(obj);
        return obj;
    }
    any._TO = _any;
    return any;
})();
var number = (function () {
    var _number = new TypedObject.StructType({
    });
    function _ctor() {
    }
    function number() {
        var obj = new _number();
        _ctor.call(obj);
        return obj;
    }
    number._TO = _number;
    return number;
})();
var boolean = (function () {
    var _boolean = new TypedObject.StructType({
    });
    function _ctor() {
    }
    function boolean() {
        var obj = new _boolean();
        _ctor.call(obj);
        return obj;
    }
    boolean._TO = _boolean;
    return boolean;
})();
var string = (function () {
    var _string = new TypedObject.StructType({
    });
    function _ctor() {
    }
    function string() {
        var obj = new _string();
        _ctor.call(obj);
        return obj;
    }
    string._TO = _string;
    return string;
})();
