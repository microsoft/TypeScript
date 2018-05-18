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

verify.completions({
    marker: "5",
    includes: { name: "Colors", text: "enum Colors", documentation: "Enum of colors" },
    isNewIdentifierLocation: true,
});
verify.quickInfoIs("enum Colors", "Enum of colors");

const completions = [
    { name: "Cornflower", text: "(enum member) Colors.Cornflower = 0", documentation: "Fancy name for 'blue'" },
    { name: "FancyPink", text: "(enum member) Colors.FancyPink = 1", documentation: "Fancy name for 'pink'" },
];
verify.completions({ marker: "6", includes: completions });
verify.quickInfoIs("(enum member) Colors.Cornflower = 0", "Fancy name for 'blue'");

verify.completions({ marker: "7", includes: completions });
verify.quickInfoIs("(enum member) Colors.FancyPink = 1", "Fancy name for 'pink'");