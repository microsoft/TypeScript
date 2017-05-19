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

verify.rangesAreRenameLocations();
