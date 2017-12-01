===ORIGINAL===

namespace M {
    // comment 1
    var x = 1; // comment 2
    // comment 3
    var y; // comment 4
    var z = 3; // comment 5
    // comment 6
    var a = 4; // comment 7
}
===MODIFIED===

public class class1 implements interface1
{
    property1: boolean;
}
namespace M {
    // comment 1
    var x = 1; // comment 2
    // comment 3
    var y; // comment 4
    var z = 3; // comment 5
    // comment 6
    var a = 4; // comment 7
}