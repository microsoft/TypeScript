/// <reference path='fourslash.ts'/>

//// interface Orange {
////     color: string;
//// }
//// interface Apple {
////     color: string;
////     other: Orange;
//// }
//// type TwoFruits/*T*/ = [Orange, Apple];
//// const tf/*f*/: TwoFruits = [
////     { color: "orange" },
////     { color: "red", other: { color: "orange" } }
//// ];
//// const tf2/*f2*/: [Orange, Apple] = [
////     { color: "orange" },
////     { color: "red", other: { color: "orange" } }
//// ];
//// type ManyFruits/*m*/ = (Orange | Apple)[];
//// const mf/*mf*/: ManyFruits = [];

verify.baselineQuickInfo({
    "T": [0, 1, 2],
    "f": [0, 1, 2, 3],
    "f2": [0, 1, 2],
    "m": [0, 1, 2],
    "mf": [0, 1, 2, 3],
});