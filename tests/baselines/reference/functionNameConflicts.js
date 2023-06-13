//// [tests/cases/conformance/functions/functionNameConflicts.ts] ////

//// [functionNameConflicts.ts]
//Function and variable of the same name in same declaration space
//Function overload with different name from implementation signature 

module M {
    function fn1() { }
    var fn1;

    var fn2;
    function fn2() { }
}

function fn3() { }
var fn3;

function func() {
    var fn4;
    function fn4() { }

    function fn5() { }
    var fn5;
}

function over();
function overrr() {

}


//// [functionNameConflicts.js]
//Function and variable of the same name in same declaration space
//Function overload with different name from implementation signature 
var M;
(function (M) {
    function fn1() { }
    var fn1;
    var fn2;
    function fn2() { }
})(M || (M = {}));
function fn3() { }
var fn3;
function func() {
    var fn4;
    function fn4() { }
    function fn5() { }
    var fn5;
}
function overrr() {
}
