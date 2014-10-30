function f() {
    return function (s) {
        console.log(s);
    };
    ("harmless extra line");
}