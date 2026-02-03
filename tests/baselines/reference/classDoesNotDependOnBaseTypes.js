//// [tests/cases/conformance/types/typeAliases/classDoesNotDependOnBaseTypes.ts] ////

//// [classDoesNotDependOnBaseTypes.ts]
type StringTree = string | StringTreeCollection;
class StringTreeCollectionBase {
    [n: number]: StringTree;
}

class StringTreeCollection extends StringTreeCollectionBase { }

var x: StringTree;
if (typeof x !== "string") {
    x[0] = "";
    x[0] = new StringTreeCollection;
}

//// [classDoesNotDependOnBaseTypes.js]
class StringTreeCollectionBase {
}
class StringTreeCollection extends StringTreeCollectionBase {
}
var x;
if (typeof x !== "string") {
    x[0] = "";
    x[0] = new StringTreeCollection;
}
