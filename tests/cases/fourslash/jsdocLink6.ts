///<reference path="fourslash.ts" />
//// class FooError extends Error {}
//// class BarError extends Error {}
//// /**
////  * Performs blubber.
////  * 
////  * @throws {@link FooError} if foo happens.
////  * @throws {@link BarError} if bar happens.
////  */
//// function blubber() {}
//// blubber/*3*/();

verify.noErrors()
verify.baselineQuickInfo();
