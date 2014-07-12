//// [qualifiedName_ImportDeclarations-entity-names-referencing-a-var.ts]
module Alpha {
    export var x = 100;
}

module Beta {
    import p = Alpha.x;
}


var x = Alpha.x

//// [qualifiedName_ImportDeclarations-entity-names-referencing-a-var.js]
var Alpha;
(function (Alpha) {
    Alpha.x = 100;
})(Alpha || (Alpha = {}));

var Beta;
(function (Beta) {
})(Beta || (Beta = {}));

var x = Alpha.x;
