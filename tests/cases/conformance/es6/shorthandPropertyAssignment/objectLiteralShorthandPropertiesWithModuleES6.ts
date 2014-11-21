// @target: es6

module m {
    export var x;
}

module m {
    var z = x;
    var y = {
        a: x,
        x
    };
}
