//// [tests/cases/compiler/declarationEmitHasTypesRefOnNamespaceUse.ts] ////

//// [dep.d.ts]
declare namespace NS {
    interface Dep {
    }
}
//// [package.json]
{
    "typings": "dep.d.ts"
}
//// [index.ts]
class Src implements NS.Dep { }


//// [index.js]
var Src = /** @class */ (function () {
    function Src() {
    }
    return Src;
}());


//// [index.d.ts]
declare class Src implements NS.Dep {
}
