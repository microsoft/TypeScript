//// [tests/cases/compiler/typedGenericPrototypeMember.ts] ////

//// [typedGenericPrototypeMember.ts]
class List<T> {
   add(item: T) { }
}

List.prototype.add("abc"); // Valid because T is instantiated to any


//// [typedGenericPrototypeMember.js]
var List = /** @class */ (function () {
    function List() {
    }
    List.prototype.add = function (item) { };
    return List;
}());
List.prototype.add("abc"); // Valid because T is instantiated to any
