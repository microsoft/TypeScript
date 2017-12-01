/// <reference path='fourslash.ts' />

////interface MultiRobot {
////    name: string;
////    skills: {
////        primary: string;
////        secondary: string;
////    };
////}
////let multiRobot: MultiRobot, [|primary|]: string;
////for ({ skills: { primary: primaryA, secondary: secondaryA } } = multiRobot, i = 0; i < 1; i++) {
////    console.log(primaryA);
////}
////for ({ skills: { [|primary|], secondary } } = multiRobot, i = 0; i < 1; i++) {
////    console.log([|primary|]);
////}

verify.rangesAreRenameLocations();
