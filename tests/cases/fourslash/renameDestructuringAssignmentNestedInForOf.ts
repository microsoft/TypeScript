/// <reference path='fourslash.ts' />

////interface MultiRobot {
////    name: string;
////    skills: {
////        [|[|{| "declarationRangeIndex": 0 |}primary|]: string;|]
////        secondary: string;
////    };
////}
////let multiRobots: MultiRobot[];
////let [|[|{| "declarationRangeIndex": 2 |}primary|]: string|], secondary: string, primaryA: string, secondaryA: string;
////for ([|{ skills: { [|{| "declarationRangeIndex": 4 |}primary|]: primaryA, secondary: secondaryA } } of multiRobots|]) {
////    primaryA;
////}
////for ([|{ skills: { [|{| "declarationRangeIndex": 6 |}primary|], secondary } } of multiRobots|]) {
////    [|primary|];
////}

verify.noErrors();
const [r0Def, r0, r1Def, r1, r2Def, r2, r3Def, r3, r4] = test.ranges();
verify.renameLocations([r0, r2], [r0, r2, { range: r3, suffixText: ": primary" }]);
verify.renameLocations([r1, r3, r4], [r1, { range: r3, prefixText: "primary: " }, r4])
