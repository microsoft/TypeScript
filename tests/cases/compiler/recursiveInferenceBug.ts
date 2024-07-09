function f(x: number) {
    var z = f(x);
    return x;
}


var zz = {
    g: () =>{ },
    get f() { return "abc"; },
};
