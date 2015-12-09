//// [classDoesNotDependOnBaseTypes.ts]
var x: StringTree;
if (typeof x !== "string") {
    x[0] = "";
    x[0] = new StringTreeCollection;
}

type StringTree = string | StringTreeCollection;
class StringTreeCollectionBase {
    [n: number]: StringTree;
}

class StringTreeCollection extends StringTreeCollectionBase { }

//// [classDoesNotDependOnBaseTypes.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var x;
if (typeof x !== "string") {
    x[0] = "";
    x[0] = new StringTreeCollection;
}
var StringTreeCollectionBase = (function () {
    function StringTreeCollectionBase() {
    }
    return StringTreeCollectionBase;
}());
var StringTreeCollection = (function (_super) {
    __extends(StringTreeCollection, _super);
    function StringTreeCollection() {
        _super.apply(this, arguments);
    }
    return StringTreeCollection;
}(StringTreeCollectionBase));
