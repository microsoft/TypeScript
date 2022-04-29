===ORIGINAL===

namespace M {
    var a = 1, // comment 1
        // comment 2
        b = 2, // comment 3
        // comment 4
        c = 3; // comment 5
}
===MODIFIED===

namespace M {
    var a = 1, // comment 1
        // comment 4
        c = 3; // comment 5
}