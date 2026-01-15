// @target: es6

namespace m {
    export var x;
}

namespace m {
    var z = x;
    var y = {
        a: x,
        x
    };
}
