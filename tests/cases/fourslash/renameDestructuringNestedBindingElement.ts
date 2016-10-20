/// <reference path='fourslash.ts' />

////interface MultiRobot {
////    name: string;
////    skills: {
////        [|primary|]: string;
////        secondary: string;
////    };
////}
////let multiRobots: MultiRobot[];
////for (let { skills: {[|primary|]: primaryA, secondary: secondaryA } } of multiRobots) {
////    console.log(primaryA);
////}
////for (let { skills: {[|primary|], secondary } } of multiRobots) {
////    console.log([|primary|]);
////}

let ranges = test.ranges()
for (let range of ranges) {
    goTo.position(range.start);
    verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false);
}
