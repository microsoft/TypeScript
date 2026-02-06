// @target: es2015
var recurser = function foo() {
    // using the local name
    foo();

    // using the globally visible name
    recurser();
};


(function bar() {
    bar();
});