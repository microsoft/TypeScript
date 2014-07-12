//// [ambiguousOverload.js]
function foof(bar) {
    return bar;
}
;
var x = foof("s", null);
var y = foof("s", null);

function foof2(bar) {
    return bar;
}
;
var x2 = foof2("s", null);
var y2 = foof2("s", null);
