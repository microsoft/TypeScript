// module export
var x = "Foo";
namespace m {
    export var x;
}

namespace n {
    var z = 10000;
    export var y = {
        m.x  // error
    };
}

m.y.x;
