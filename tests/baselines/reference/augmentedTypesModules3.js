//// [augmentedTypesModules3.js]
var m3 = (function () {
    function m3() {
    }
    return m3;
})();

var m3a;
(function (m3a) {
    var y = 2;
})(m3a || (m3a = {}));
var m3a = (function () {
    function m3a() {
    }
    m3a.prototype.foo = function () {
    };
    return m3a;
})(); // error, class isn't ambient or declared before the module
