/// <reference path='fourslash.ts' />

////interface MultiRobot {
////    name: string;
////    skills: {
////        /*1*/[|primary|]: string;
////        secondary: string;
////    };
////}
////let multiRobot: MultiRobot;
////for ({ skills: { /*2*/[|primary|]: primaryA, secondary: secondaryA } } = multiRobot, i = 0; i < 1; i++) {
////    console.log(primaryA);
////}
////for ({ skills: { [|primary|], secondary } } = multiRobot, i = 0; i < 1; i++) {
////    console.log(primary);
////}

goTo.marker("1");
verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false);

goTo.marker("2");
verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false);
