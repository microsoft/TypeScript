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

let ranges = test.ranges()
for (let range of ranges) {
    goTo.position(range.start);
    verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false);
}

