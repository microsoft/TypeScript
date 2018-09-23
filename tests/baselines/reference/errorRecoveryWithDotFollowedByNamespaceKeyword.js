//// [errorRecoveryWithDotFollowedByNamespaceKeyword.ts]
namespace A {
    function foo() {
        if (true) {
            B.
            

        namespace B {
            export function baz() { }
}

//// [errorRecoveryWithDotFollowedByNamespaceKeyword.js]
var A = A || (A = {});
(function (A) {
    function foo() {
        if (true) {
            B.
            ;
            var B = B || (B = {});
            (function (B) {
                function baz() { }
                B.baz = baz;
            })(B);
        }
    }
})(A);
