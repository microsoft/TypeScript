///<reference path="fourslash.ts" />
//// class FooError extends Error {}
//// class BarError extends Error {}
//// /**
////  * Performs blubber.
////  * 
////  * @throws {@link FooError/*1*/} if foo happens.
////  * @throws {@link BarError/*2*/} if bar happens.
////  */
//// function blubber() {}
//// blubber();

verify.baselineGoToDefinition("1", "2");
