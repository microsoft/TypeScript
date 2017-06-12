//// [staticOffOfInstance2.ts]
class List<T> {
    public Blah() {
        this.Foo(); // no error
        List.Foo();
    }
    public static Foo() { }
}


//// [staticOffOfInstance2.js]
var List = (function () {
    function List() {
    }
    var proto_1 = List.prototype;
    proto_1.Blah = function () {
        this.Foo(); // no error
        List.Foo();
    };
    List.Foo = function () { };
    return List;
}());
