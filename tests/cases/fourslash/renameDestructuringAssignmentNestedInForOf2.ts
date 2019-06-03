/// <reference path='fourslash.ts' />

////interface MultiRobot {
////    name: string;
////    skills: {
////        [|[|{| "declarationRangeIndex": 0 |}primary|]: string;|]
////        secondary: string;
////    };
////}
////let multiRobots: MultiRobot[], [|[|{| "declarationRangeIndex": 2 |}primary|]: string|];
////for ([|{ skills: { [|{| "declarationRangeIndex": 4 |}primary|]: primaryA, secondary: secondaryA } } of multiRobots|]) {
////    console.log(primaryA);
////}
////for ([|{ skills: { [|{| "declarationRangeIndex": 6 |}primary|], secondary } } of multiRobots|]) {
////    console.log([|primary|]);
////}

const ranges = test.ranges();
const [r0Def, r0, r1Def, r1,r2Def,  r2, r3Def, r3, r4] = ranges;
verify.renameLocations([r0, r2], [r0, r2, { range: r3, suffixText: ": primary" }]);
verify.renameLocations([r1, r3, r4], [r1, { range: r3, prefixText: "primary: " }, r4]);
