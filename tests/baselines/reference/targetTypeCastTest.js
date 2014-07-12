//// [targetTypeCastTest.js]
function Point(x, y) {
    this.x = x;
    this.y = y;
}

var add = function (x, y) {
    return x + y;
};

var add2 = function (x, y) {
    return 0;
};

function add3(x, y) {
    x;
}
