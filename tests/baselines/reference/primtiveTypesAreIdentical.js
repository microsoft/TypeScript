//// [primtiveTypesAreIdentical.js]
// primitive types are identical to themselves so these overloads will all cause errors

function foo1(x) {
}

function foo2(x) {
}

function foo3(x) {
}

function foo4(x) {
}

function foo5(x) {
}

var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (E = {}));

function foo6(x) {
}

function foo7(x) {
}
