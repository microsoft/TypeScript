//// [functionExpressionInWithBlock.js]
function x() {
    with ({}) {
        function f() {
            (function () {
                return this;
            });
        }
    }
}
