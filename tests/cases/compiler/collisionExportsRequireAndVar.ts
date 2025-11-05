//@module: amd
//@filename: collisionExportsRequireAndVar_externalmodule.ts
export function foo() {
}
var exports = 1;
var require = "require";
namespace m1 {
    var exports = 0;
    var require = "require";
}
namespace m2 {
    export var exports = 0;
    export var require = "require";
}

//@filename: collisionExportsRequireAndVar_globalFile.ts
var exports = 0;
var require = "require";
namespace m3 {
    var exports = 0;
    var require = "require";
}
namespace m4 {
    export var exports = 0;
    export var require = "require";
}