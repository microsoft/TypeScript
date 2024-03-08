/// <reference path='fourslash.ts' />

////interface MultiRobot {
////    name: string;
////    skills: {
////        [|[|{| "contextRangeIndex": 0|}primary|]: string;|]
////        secondary: string;
////    };
////}
////let multiRobots: MultiRobot[];
////for ([|let { skills: {[|{| "contextRangeIndex": 2|}primary|]: primaryA, secondary: secondaryA } } of multiRobots|]) {
////    console.log(primaryA);
////}
////for ([|let { skills: {[|{| "contextRangeIndex": 4|}primary|], secondary } } of multiRobots|]) {
////    console.log([|primary|]);
////}

const [r0Def, r0, r1Def, r1, r2Def, r2, r3] = test.ranges();
verify.baselineRename([r0, r1, r2, r3]);
