//// [emptyGenericParamList.ts]
class I<T> {}
var x: I<>;

//// [emptyGenericParamList.js]
var I = (function () {
    function I() {
    }
    return I;
}());
var x;
