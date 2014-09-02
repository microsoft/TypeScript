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
verify.baselineCurrentFileBreakpointLocations();