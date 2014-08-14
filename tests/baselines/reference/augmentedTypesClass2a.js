//// [augmentedTypesClass2a.ts]
//// class then function
class c2 { public foo() { } }
function c2() { } // error
var c2 = () => { }

//// [augmentedTypesClass2a.js]
//// class then function
var c2 = (function () {
    function c2() {
    }
    c2.prototype.foo = function () {
    };
    return c2;
})();
function c2() {
}
var c2 = function () {
};
