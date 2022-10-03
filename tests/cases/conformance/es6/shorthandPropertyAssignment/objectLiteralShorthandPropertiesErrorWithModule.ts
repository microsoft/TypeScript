// module export
var x = "Foo";
module m {
    export var x;
}

module n {
    var z = 10000;
    export var y = {
        m.x  // error
    };
}

m.y.x;
