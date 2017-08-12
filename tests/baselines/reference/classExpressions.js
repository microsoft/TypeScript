//// [classExpressions.ts]
interface A {}
let x = class B implements A {
    prop: number;
    onStart(): void {
    }
    func = () => {
    }
};

//// [classExpressions.js]
var x = (function () {
    function B() {
        this.func = function () {
        };
    }
    var proto_1 = B.prototype;
    proto_1.onStart = function () {
    };
    return B;
}());
