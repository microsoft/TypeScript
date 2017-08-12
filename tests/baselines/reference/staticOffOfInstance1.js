//// [staticOffOfInstance1.ts]
class List {
  public Blah() {
    this.Foo();
  }
  public static Foo() {}
}

//// [staticOffOfInstance1.js]
var List = (function () {
    function List() {
    }
    var proto_1 = List.prototype;
    proto_1.Blah = function () {
        this.Foo();
    };
    List.Foo = function () { };
    return List;
}());
