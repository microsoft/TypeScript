//// [objectLiteralShorthandPropertiesErrorFromNotUsingIdentifier.ts]
// errors
var y = {
    "stringLiteral",
    42,
    get e,
    set f,
    this,
    super,
    var,
    class,
    typeof
};

var x = {
    a.b,
    a["ss"],
    a[1],
};

var v = { class };  // error

//// [objectLiteralShorthandPropertiesErrorFromNotUsingIdentifier.js]
var _a;
// errors
var y = {
    "stringLiteral": ,
    42: ,
    get e() { },
    set f() { },
    "this": ,
    "super": ,
    "var": ,
    "class": ,
    "typeof": 
};
var x = (_a = {
        a: a,
        : .b,
        a: a
    },
    _a["ss"] = ,
    _a.a = a,
    _a[1] = ,
    _a);
var v = { "class":  }; // error
