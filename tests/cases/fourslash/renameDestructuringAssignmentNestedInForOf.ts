/// <reference path='fourslash.ts' />

////interface MultiRobot {
////    name: string;
////    skills: {
////        [|primary|]: string;
////        secondary: string;
////    };
////}
////let multiRobots: MultiRobot[];
////let [|primary|]: string, secondary: string, primaryA: string, secondaryA: string;
////for ({ skills: { [|primary|]: primaryA, secondary: secondaryA } } of multiRobots) {
////    primaryA;
////}
////for ({ skills: { [|primary|], secondary } } of multiRobots) {
////    [|primary|];
////}

verify.noErrors();
const [r0, r1, r2, r3, r4] = test.ranges();
verify.renameLocations([r0, r2], [r0, r2, { range: r3, suffixText: ": primary" }]);
verify.renameLocations([r1, r3, r4], [r1, { range: r3, prefixText: "primary: " }, r4])
