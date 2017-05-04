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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var StringTreeCollectionBase = (function () {
    function StringTreeCollectionBase() {
    }
    return StringTreeCollectionBase;
}());
var StringTreeCollection = (function (_super) {
    __extends(StringTreeCollection, _super);
    function StringTreeCollection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return StringTreeCollection;
}(StringTreeCollectionBase));
var x;
if (typeof x !== "string") {
    x[0] = "";
    x[0] = new StringTreeCollection;
}
