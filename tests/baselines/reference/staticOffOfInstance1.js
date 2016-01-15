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
    List.prototype.Blah = function () {
        this.Foo();
    };
    List.Foo = function () { };
    return List;
}());
