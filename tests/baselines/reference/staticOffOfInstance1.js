//// [staticOffOfInstance1.js]
var List = (function () {
    function List() {
    }
    List.prototype.Blah = function () {
        this.Foo();
    };
    List.Foo = function () {
    };
    return List;
})();
