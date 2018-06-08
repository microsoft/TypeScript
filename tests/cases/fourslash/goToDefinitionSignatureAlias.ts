/// <reference path='fourslash.ts'/>

////function /*f*/f() {}
////const /*g*/g = f;
////const /*h*/h = g;

////[|/*useF*/f|]();
////[|/*useG*/g|]();
////[|/*useH*/h|]();

verify.goToDefinition({
    useF: "f",
    useG: ["g", "f"],
    useH: ["h", "f"],
});
