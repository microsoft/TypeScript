/// <reference path='fourslash.ts' />

////interface MultiRobot {
////    name: string;
////    skills: {
////        [|primary|]: string;
////        secondary: string;
////    };
////}
////let multiRobot: MultiRobot, [|primary|]: string, secondary: string, primaryA: string, secondaryA: string, i: number;
////for ({ skills: { [|primary|]: primaryA, secondary: secondaryA } } = multiRobot, i = 0; i < 1; i++) {
////    primaryA;
////}
////for ({ skills: { [|primary|], secondary } } = multiRobot, i = 0; i < 1; i++) {
////    [|primary|];
////}

verify.noErrors();
const ranges = test.ranges();
const [r0, r1, r2, r3, r4] = ranges;
verify.renameLocations([r0, r2], [r0, r2, { range: r3, suffixText: ": primary" }]);
verify.renameLocations([r1, r3, r4], [r1, { range: r3, prefixText: "primary: " }, r4]);
