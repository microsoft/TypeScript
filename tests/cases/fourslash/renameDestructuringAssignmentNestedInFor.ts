/// <reference path='fourslash.ts' />

////interface MultiRobot {
////    name: string;
////    skills: {
////        [|primary|]: string;
////        secondary: string;
////    };
////}
////let multiRobot: MultiRobot;
////for ({ skills: { [|primary|]: primaryA, secondary: secondaryA } } = multiRobot, i = 0; i < 1; i++) {
////    console.log(primaryA);
////}
////for ({ skills: { [|primary|], secondary } } = multiRobot, i = 0; i < 1; i++) {
////    console.log(primary);
////}

const ranges = test.ranges();
const [r0, r1] = ranges;
verify.renameLocations([r0, r1], ranges);
