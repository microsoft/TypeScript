/// <reference path='fourslash.ts' />

////interface MultiRobot {
////    name: string;
////    skills: {
////        [|[|{| "contextRangeIndex": 0 |}primary|]: string;|]
////        secondary: string;
////    };
////}
////let multiRobots: MultiRobot[], [|[|{| "contextRangeIndex": 2 |}primary|]: string|];
////for ([|{ skills: { [|{| "contextRangeIndex": 4 |}primary|]: primaryA, secondary: secondaryA } } of multiRobots|]) {
////    console.log(primaryA);
////}
////for ([|{ skills: { [|{| "contextRangeIndex": 6 |}primary|], secondary } } of multiRobots|]) {
////    console.log([|primary|]);
////}

const ranges = test.ranges();
const [r0Def, r0, r1Def, r1,r2Def,  r2, r3Def, r3, r4] = ranges;
verify.baselineRename([r0, r2, r1, r3, r4]);
