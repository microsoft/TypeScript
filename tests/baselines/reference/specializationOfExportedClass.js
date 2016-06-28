//// [specializationOfExportedClass.ts]
module M {

export class C<T> { }

}
 
var x = new M.C<string>();


//// [specializationOfExportedClass.js]
var M;
(function (M) {
    var C = (function () {
        function C() {
        }
        return C;
    }());
    M.C = C;
})(M || (M = {}));
var x = new M.C();
