//// [tests/cases/conformance/externalModules/verbatimModuleSyntaxConstEnum.ts] ////

//// [verbatimModuleSyntaxConstEnum.ts]
export const enum E {
    A = 1,
}


//// [verbatimModuleSyntaxConstEnum.js]
export var E;
(function (E) {
    E[E["A"] = 1] = "A";
})(E || (E = {}));
