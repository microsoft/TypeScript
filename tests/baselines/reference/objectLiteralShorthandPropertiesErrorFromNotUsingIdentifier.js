//// [tests/cases/conformance/es6/shorthandPropertyAssignment/objectLiteralShorthandPropertiesErrorFromNotUsingIdentifier.ts] ////

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
// errors
var y = {
    "stringLiteral": ,
    42: ,
    get e() { },
    set f() { },
    this: ,
    super: ,
    var: ,
    class: ,
    typeof: 
};
var x = {
    a, : .b,
    a, ["ss"]: ,
    a, [1]: ,
};
var v = { class:  }; // error
