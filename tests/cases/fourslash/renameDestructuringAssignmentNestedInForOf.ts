/// <reference path='fourslash.ts' />

////interface MultiRobot {
////    name: string;
////    skills: {
////        /*1*/[|primary|]: string;
////        secondary: string;
////    };
////}
////let multiRobots: MultiRobot[];
////for ({ skills: { /*2*/[|primary|]: primaryA, secondary: secondaryA } } of multiRobots) {
////    console.log(primaryA);
////}
////for ({ skills: { [|primary|], secondary } } of multiRobots) {
////    console.log(primary);
////}

goTo.marker("1");
verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false);

goTo.marker("2");
verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false);
