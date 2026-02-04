// @target: es2015
namespace Alpha {
    export var x = 100;
}

namespace Beta {
    import p = Alpha.x;
}


var x = Alpha.x