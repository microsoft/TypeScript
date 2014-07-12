//// [staticMemberExportAccess.js]
var Sammy = (function () {
    function Sammy() {
    }
    Sammy.prototype.foo = function () {
        return "hi";
    };
    Sammy.bar = function () {
        return -1;
    };
    return Sammy;
})();
var Sammy;
(function (Sammy) {
    Sammy.x = 1;
})(Sammy || (Sammy = {}));

var $;
var instanceOfClassSammy = new $.sammy();
var r1 = instanceOfClassSammy.foo();
var r2 = $.sammy.foo();
var r3 = $.sammy.bar();
var r4 = $.sammy.x;

Sammy.bar();
