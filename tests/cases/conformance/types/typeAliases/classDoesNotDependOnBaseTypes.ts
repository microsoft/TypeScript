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