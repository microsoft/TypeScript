/// <reference path='fourslash.ts' />

////interface MultiRobot {
////    name: string;
////    skills: {
////        [|primary|]: string;
////        secondary: string;
////    };
////}
////let multiRobots: MultiRobot[];
////for ({ skills: { [|primary|]: primaryA, secondary: secondaryA } } of multiRobots) {
////    console.log(primaryA);
////}
////for ({ skills: { [|primary|], secondary } } of multiRobots) {
////    console.log(primary);
////}

const ranges = test.ranges();
const [r0, r1] = ranges;
verify.renameLocations([r0, r1], ranges);
