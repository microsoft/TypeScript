/// <reference path='fourslash.ts'/>

////function /*f*/f() {}
////const /*g*/g = f;
////const /*h*/h = g;

////[|/*useF*/f|]();
////[|/*useG*/g|]();
////[|/*useH*/h|]();

////const i = /*i*/() => 0;
////const /*j*/j = i;

////[|/*useI*/i|]();
////[|/*useJ*/j|]();

verify.goToDefinition({
    useF: "f",
    useG: ["g", "f"],
    useH: ["h", "f"],

    useI: "i",
    useJ: ["j", "i"],
});
