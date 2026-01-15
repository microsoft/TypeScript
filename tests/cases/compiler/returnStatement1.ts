// @allowUnreachableCode: true

function f() {
    return function (s) {
        var x = s;
    };
    ("harmless extra line");
}