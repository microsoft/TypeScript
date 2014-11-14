// module export
var x = "Foo";
module m {
    export var x;
}

module m {
    var z = 10000;
    export var y = {
        x
    };
}

m.y.x;
