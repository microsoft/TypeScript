//// [parserErrantAccessibilityModifierInModule1.ts]
module M {
    var x=10;  // variable local to this module body
    private y=x;  // property visible only in module
    export var z=y;  // property visible to any code
}

//// [parserErrantAccessibilityModifierInModule1.js]
var M;
(function (M) {
    var x = 10; // variable local to this module body
    y = x; // property visible only in module
    M.z = y; // property visible to any code
})(M || (M = {}));
