//// [tests/cases/conformance/parser/ecmascript5/RegressionTests/parser509630.ts] ////

//// [parser509630.ts]
class Type {
    public examples = [ // typing here
}
class Any extends Type {
}


//// [parser509630.js]
class Type {
    examples = []; // typing here
}
class Any extends Type {
}
