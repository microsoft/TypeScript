//// [tests/cases/compiler/reservedWords3.ts] ////

//// [reservedWords3.ts]
function f1(enum) {}
function f2(class) {}
function f3(function) {}
function f4(while) {}
function f5(for) {}


//// [reservedWords3.js]
function f1() { }
var ;
(function () {
})( || ( = {}));
{ }
function f2() { }
var default_1 = /** @class */ (function () {
    function default_1() {
    }
    return default_1;
}());
{ }
function f3() { }
function () { }
{ }
function f4() { }
while () { }
function f5() { }
for (;;) { }
