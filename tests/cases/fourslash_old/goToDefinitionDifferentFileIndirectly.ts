/// <reference path='fourslash.ts' />

// @Filename: Remote2.ts
////var /*remoteVariableDefinition*/rem2Var;
/////*remoteFunctionDefinition*/function rem2Fn() { }
/////*remoteClassDefinition*/class rem2Cls { }
/////*remoteInterfaceDefinition*/interface rem2Int{}
////module /*remoteModuleDefinition*/rem2Mod { export var foo; }

// @Filename: Remote1.ts
////var remVar;
////function remFn() { }
////class remCls { }
////interface remInt{}
////module remMod { export var foo; }

// @Filename: Definition.ts
/////*remoteVariableReference*/rem2Var = 1;
/////*remoteFunctionReference*/rem2Fn();
////var rem2foo = new /*remoteClassReference*/rem2Cls();
////class rem2fooCls implements /*remoteInterfaceReference*/rem2Int { }
////var rem2fooVar = /*remoteModuleReference*/rem2Mod.foo;

var markerList = [
    "remoteVariable",
    "remoteFunction",
    "remoteClass",
    "remoteInterface",
    "remoteModule",
];

markerList.forEach((marker) => {
    goTo.marker(marker + 'Reference');
    goTo.definition();
    verify.caretAtMarker(marker + 'Definition');
});