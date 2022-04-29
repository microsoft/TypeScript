/// <reference path='fourslash.ts' />

// @BaselineFile: bpSpan_switch.baseline
// @Filename: bpSpan_switch.ts

////var x = 10;
////switch (x) {
////    case 5:
////        x++;
////        break;
////    case 10:
////        {
////            x--;
////            break;
////        }
////    default:
////        x = x *10;
////}
////switch (x)
////{
////    case 5:
////        x++;
////        break;
////    case 10:
////        {
////            x--;
////            break;
////        }
////    default:
////        {
////            x = x * 10;
////        }
////}
////switch ((function foo() {
////    return x * 30;
////})()) {
////    case (function bar() {
////        return 30;
////    })():
////        x++;
////}
verify.baselineCurrentFileBreakpointLocations();