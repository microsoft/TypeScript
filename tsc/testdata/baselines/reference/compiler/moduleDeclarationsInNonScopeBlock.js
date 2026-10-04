//// [tests/cases/compiler/moduleDeclarationsInNonScopeBlock.ts] ////

//// [moduleDeclarationsInNonScopeBlock.ts]
{
    export { a } from "exportNamed";
    export * from "exportStar";
    import { b } from "importNamed";
    import c = require("importEquals");
    import "sideEffect";
}


//// [moduleDeclarationsInNonScopeBlock.js]
"use strict";
{
    export { a } from "exportNamed";
    export * from "exportStar";
    import { b } from "importNamed";
    import c = require("importEquals");
    import "sideEffect";
}
