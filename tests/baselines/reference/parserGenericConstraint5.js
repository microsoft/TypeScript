//// [parserGenericConstraint5.ts]
class C<T extends List<List<T>> > {
}

//// [parserGenericConstraint5.js]
var C = (function () {
    function C() {
    }
    return C;
}());
