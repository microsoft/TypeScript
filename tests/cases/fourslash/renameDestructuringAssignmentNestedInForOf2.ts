/// <reference path='fourslash.ts' />

////interface MultiRobot {
////    name: string;
////    skills: {
////        [|primary|]: string;
////        secondary: string;
////    };
////}
////let multiRobots: MultiRobot[], [|primary|]: string;
////for ({ skills: { [|primary|]: primaryA, secondary: secondaryA } } of multiRobots) {
////    console.log(primaryA);
////}
////for ({ skills: { [|primary|], secondary } } of multiRobots) {
////    console.log([|primary|]);
////}

const ranges = test.ranges();
const [r0, r1, r2, r3, r4] = ranges;
verify.renameLocations([r0, r2], [r0, r2, r3]);
verify.renameLocations([r1, r4], [r1, r3, r4]);
verify.renameLocations(r3, ranges);
