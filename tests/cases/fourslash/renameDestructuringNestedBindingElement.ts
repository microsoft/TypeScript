/// <reference path='fourslash.ts' />

////interface MultiRobot {
////    name: string;
////    skills: {
////        [|primary|]: string;
////        secondary: string;
////    };
////}
////let multiRobots: MultiRobot[];
////for (let { skills: {[|primary|]: primaryA, secondary: secondaryA } } of multiRobots) {
////    console.log(primaryA);
////}
////for (let { skills: {[|primary|], secondary } } of multiRobots) {
////    console.log([|primary|]);
////}

const [r0, r1, r2, r3] = test.ranges();
verify.renameLocations([r0, r1], [r0, r1, { range: r2, suffixText: ": primary" }]);
verify.renameLocations([r2, r3], [{ range: r2, prefixText: "primary: " }, r3]);
