//// [lambdaPropSelf.js]
var Person = (function () {
    function Person(name, children) {
        var _this = this;
        this.name = name;
        this.addChild = function () {
            return _this.children.push("New child");
        };
        this.children = ko.observableArray(children);
    }
    return Person;
})();

var T = (function () {
    function T() {
    }
    T.prototype.fo = function () {
        var x = this;
    };
    return T;
})();

var M;
(function (M) {
    var x = this;
})(M || (M = {}));
