//// [checkGrammarStaticMemberName_es5.ts]

class static_property {
    static length = 1;
    static name = 1;
    static arguments = 1;
    static caller = 1;
    static foo = {
        ["length"]: 1,
        ["name"]: 1,
        ["arguments"]: 1,
        ["caller"]: 1,
    };
}

class static_method {
    static length() { return 1; }
    static name() { return 1; }
    static arguments() { return 1; }
    static caller() { return 1; }
}


//// [checkGrammarStaticMemberName_es5.js]
var static_property = (function () {
    function static_property() {
    }
    static_property.length = 1;
    static_property.name = 1;
    static_property.arguments = 1;
    static_property.caller = 1;
    static_property.foo = (_a = {},
        _a["length"] = 1,
        _a["name"] = 1,
        _a["arguments"] = 1,
        _a["caller"] = 1,
        _a
    );
    return static_property;
    var _a;
}());
var static_method = (function () {
    function static_method() {
    }
    static_method.length = function () { return 1; };
    static_method.name = function () { return 1; };
    static_method.arguments = function () { return 1; };
    static_method.caller = function () { return 1; };
    return static_method;
}());
