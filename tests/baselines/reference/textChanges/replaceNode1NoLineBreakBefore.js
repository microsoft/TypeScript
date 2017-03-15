===ORIGINAL===

namespace A {
    const x = 1, y = "2";
}

===MODIFIED===

namespace A {
    const x = 1, z1 = {
        p1: 1
    };
}
