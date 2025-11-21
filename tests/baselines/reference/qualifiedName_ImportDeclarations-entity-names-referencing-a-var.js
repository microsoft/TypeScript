//// [tests/cases/compiler/qualifiedName_ImportDeclarations-entity-names-referencing-a-var.ts] ////

//// [qualifiedName_ImportDeclarations-entity-names-referencing-a-var.ts]
namespace Alpha {
    export var x = 100;
}

namespace Beta {
    import p = Alpha.x;
}


var x = Alpha.x

//// [qualifiedName_ImportDeclarations-entity-names-referencing-a-var.js]
var Alpha;
(function (Alpha) {
    Alpha.x = 100;
})(Alpha || (Alpha = {}));
var x = Alpha.x;
