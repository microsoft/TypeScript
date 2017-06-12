//// [typedGenericPrototypeMember.ts]
class List<T> {
   add(item: T) { }
}

List.prototype.add("abc"); // Valid because T is instantiated to any


//// [typedGenericPrototypeMember.js]
var List = (function () {
    function List() {
    }
    var proto_1 = List.prototype;
    proto_1.add = function (item) { };
    return List;
}());
List.prototype.add("abc"); // Valid because T is instantiated to any
