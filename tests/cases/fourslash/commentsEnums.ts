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
    4: "var x: Colors",
    5: ["enum Colors", "Enum of colors"],
    6: ["(enum member) Colors.Cornflower = 0", "Fancy name for 'blue'"],
    7: ["(enum member) Colors.FancyPink = 1", "Fancy name for 'pink'"],
});

verify.completions(
    {
        marker: "5",
        includes: { name: "Colors", text: "enum Colors", documentation: "Enum of colors" },
        isNewIdentifierLocation: true,
    },
    {
        marker: ["6", "7"],
        exact: [
            { name: "Cornflower", text: "(enum member) Colors.Cornflower = 0", documentation: "Fancy name for 'blue'" },
            { name: "FancyPink", text: "(enum member) Colors.FancyPink = 1", documentation: "Fancy name for 'pink'" },
        ]
    },
);
