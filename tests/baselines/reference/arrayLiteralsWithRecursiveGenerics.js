//// [tests/cases/conformance/types/typeRelationships/recursiveTypes/arrayLiteralsWithRecursiveGenerics.ts] ////

//// [arrayLiteralsWithRecursiveGenerics.ts]
class List<T> {
    data: T;
    next: List<List<T>>;
}

class DerivedList<U> extends List<U> {
    foo: U;
    // next: List<List<U>>
}

class MyList<T> {
    data: T;
    next: MyList<MyList<T>>;
}

var list: List<number>;
var list2: List<string>;
var myList: MyList<number>;

var xs = [list, myList]; // {}[]
var ys = [list, list2]; // {}[]
var zs = [list, null]; // List<number>[]

var myDerivedList: DerivedList<number>;
var as = [list, myDerivedList]; // List<number>[]

//// [arrayLiteralsWithRecursiveGenerics.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var List = /** @class */ (function () {
    function List() {
    }
    return List;
}());
var DerivedList = /** @class */ (function (_super) {
    __extends(DerivedList, _super);
    function DerivedList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DerivedList;
}(List));
var MyList = /** @class */ (function () {
    function MyList() {
    }
    return MyList;
}());
var list;
var list2;
var myList;
var xs = [list, myList]; // {}[]
var ys = [list, list2]; // {}[]
var zs = [list, null]; // List<number>[]
var myDerivedList;
var as = [list, myDerivedList]; // List<number>[]
