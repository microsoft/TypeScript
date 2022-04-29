var x;
function foo() {
    let x = 0;
    (function () {
        var _x = 1;
        console.log(x);
    })();
}