/// <reference path='fourslash.ts' />

////interface MultiRobot {
////    name: string;
////    skills: {
////        [|[|{| "contextRangeIndex": 0 |}primary|]: string;|]
////        secondary: string;
////    };
////}
////let multiRobots: MultiRobot[];
////let [|[|{| "contextRangeIndex": 2 |}primary|]: string|], secondary: string, primaryA: string, secondaryA: string;
////for ([|{ skills: { [|{| "contextRangeIndex": 4 |}primary|]: primaryA, secondary: secondaryA } } of multiRobots|]) {
////    primaryA;
////}
////for ([|{ skills: { [|{| "contextRangeIndex": 6 |}primary|], secondary } } of multiRobots|]) {
////    [|primary|];
////}

verify.noErrors();
const [r0Def, r0, r1Def, r1, r2Def, r2, r3Def, r3, r4] = test.ranges();
verify.baselineRename([r0, r2, r1, r3, r4]);
