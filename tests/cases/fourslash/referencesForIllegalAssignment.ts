/// <reference path='fourslash.ts'/>

////f/*1*/oo = fo/*2*/o;

////var [|{| "isWriteAccess": true, "isDefinition": true |}bar|] = function () { };
////[|{| "isWriteAccess": true |}bar|] = [|bar|] + 1;

goTo.marker("1");
verify.noReferences();

goTo.marker("2");
verify.noReferences();

verify.singleReferenceGroup("var bar: () => void");
