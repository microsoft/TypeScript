//// [assignmentToObjectAndFunction.js]
var errObj = { toString: 0 };
var goodObj = {
    toString: function (x) {
        return "";
    }
};

var errFun = {};

function foo() {
}
var foo;
(function (foo) {
    foo.boom = 0;
})(foo || (foo = {}));

var goodFundule = foo;

function bar() {
}
var bar;
(function (bar) {
    function apply(thisArg, argArray) {
    }
    bar.apply = apply;
})(bar || (bar = {}));

var goodFundule2 = bar;

function bad() {
}
var bad;
(function (bad) {
    bad.apply = 0;
})(bad || (bad = {}));

var badFundule = bad; // error
