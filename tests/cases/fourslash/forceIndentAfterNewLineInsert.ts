///<reference path="fourslash.ts"/>

////function f1()
////{ return 0; }
////function f2()
////{
////return 0;
////}
////function g()
////{ function h() {
////return 0;
////}}
format.document();
verify.currentFileContentIs(
`function f1() { return 0; }
function f2() {
    return 0;
}
function g() {
    function h() {
        return 0;
    }
}`);
