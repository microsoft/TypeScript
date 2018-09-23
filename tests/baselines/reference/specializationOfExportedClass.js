//// [specializationOfExportedClass.ts]
module M {

export class C<T> { }

}
 
var x = new M.C<string>();


//// [specializationOfExportedClass.js]
var M = M || (M = {});
(function (M) {
    var C = /** @class */ (function () {
        function C() {
        }
        return C;
    }());
    M.C = C;
})(M);
var x = new M.C();
