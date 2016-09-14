/// <reference path='fourslash.ts' />

////var /*A*/f: {
////    x: number;
////    <
////};

verify.quickInfoAt("A", "var f: {\n    (): any;\n    x: number;\n}");
