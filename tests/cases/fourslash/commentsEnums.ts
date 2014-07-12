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

goTo.marker('1');
verify.quickInfoIs("Colors", "Enum of colors", "Colors", "enum");

goTo.marker('2');
verify.quickInfoIs("Colors", "Fancy name for 'blue'", "Colors.Cornflower", "property");

goTo.marker('3');
verify.quickInfoIs("Colors", "Fancy name for 'pink'", "Colors.FancyPink", "property");

goTo.marker('4');
verify.quickInfoIs("Colors", "", "x", "var");

goTo.marker('5');
verify.completionListContains("Colors", "Colors", "Enum of colors", "Colors", "enum");
verify.quickInfoIs("typeof Colors", "Enum of colors", "Colors", "enum");

goTo.marker('6');
verify.memberListContains("Cornflower", "Colors", "Fancy name for 'blue'", "Colors.Cornflower", "property");
verify.memberListContains("FancyPink", "Colors", "Fancy name for 'pink'", "Colors.FancyPink", "property");
verify.quickInfoIs("Colors", "Fancy name for 'blue'", "Colors.Cornflower", "property");

goTo.marker('7');
verify.memberListContains("Cornflower", "Colors", "Fancy name for 'blue'", "Colors.Cornflower", "property");
verify.memberListContains("FancyPink", "Colors", "Fancy name for 'pink'", "Colors.FancyPink", "property");
verify.quickInfoIs("Colors", "Fancy name for 'pink'", "Colors.FancyPink", "property");