/// <reference path='fourslash.ts' />

////enum Colors {
////    Red,
////    Green
////}
////
////Colors./*enumVariable*/;
////
////var x = Colors.Red;
////x./*variableOfEnumType*/;
////
////function foo(): Colors { return null; }
////foo()./*callOfEnumReturnType*/

goTo.marker("enumVariable");
// Should only have the enum's own members, and nothing else
verify.memberListContains("Red");
verify.memberListContains("Green");
verify.memberListCount(2);


goTo.marker("variableOfEnumType");
// Should have number members, and not enum members
verify.memberListContains("toString");
verify.not.memberListContains("Red");


goTo.marker("callOfEnumReturnType");
// Should have number members, and not enum members
verify.memberListContains("toString");
verify.not.memberListContains("Red");
