//// [specializationOfExportedClass.ts]
module M {

export class C<T> { }

}
 
var x = new M.C<string>();


//// [specializationOfExportedClass.js]
var M;
(function (M) {
    var C = /** @class */ (function () {
        function C() {
        }
        return C;
    }());
    M.C = C;
})(M || (M = {}));
var x = new M.C();
