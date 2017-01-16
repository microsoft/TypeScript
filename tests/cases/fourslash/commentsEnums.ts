/// <reference path='fourslash.ts' />

/////** Enum of colors*/
////enum /*1*/Colors {
////    /** Fancy name for 'blue'*/
////    /*2*/Cornflower,
////    /** Fancy name for 'pink'*/
////    /*3*/FancyPink
////}
////var /*4*/x = /*5*/Colors./*6*/Cornflower;
////x = Colors./*7*/FancyPink;

verify.quickInfos({
    1: ["enum Colors", "Enum of colors"],
    2: ["(enum member) Colors.Cornflower = 0", "Fancy name for 'blue'"],
    3: ["(enum member) Colors.FancyPink = 1", "Fancy name for 'pink'"],
    4: "var x: Colors"
});

goTo.marker('5');
verify.completionListContains("Colors", "enum Colors", "Enum of colors");
verify.quickInfoIs("enum Colors", "Enum of colors");

goTo.marker('6');
verify.completionListContains("Cornflower", "(enum member) Colors.Cornflower = 0", "Fancy name for 'blue'");
verify.completionListContains("FancyPink", "(enum member) Colors.FancyPink = 1", "Fancy name for 'pink'");
verify.quickInfoIs("(enum member) Colors.Cornflower = 0", "Fancy name for 'blue'");

goTo.marker('7');
verify.completionListContains("Cornflower", "(enum member) Colors.Cornflower = 0", "Fancy name for 'blue'");
verify.completionListContains("FancyPink", "(enum member) Colors.FancyPink = 1", "Fancy name for 'pink'");
verify.quickInfoIs("(enum member) Colors.FancyPink = 1", "Fancy name for 'pink'");