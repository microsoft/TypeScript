//// [tests/cases/compiler/qualifiedName_entity-name-resolution-does-not-affect-class-heritage.ts] ////

//// [qualifiedName_entity-name-resolution-does-not-affect-class-heritage.ts]
module Alpha {
    export var x = 100;
}

class Beta extends Alpha.x {
}

//// [qualifiedName_entity-name-resolution-does-not-affect-class-heritage.js]
var Alpha;
(function (Alpha) {
    Alpha.x = 100;
})(Alpha || (Alpha = {}));
class Beta extends Alpha.x {
}
