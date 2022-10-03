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

verify.completions(
    // Should only have the enum's own members, and nothing else
    { marker: "enumVariable", exact: ["Green", "Red"] },
    // Should have number members, and not enum members
    { marker: ["variableOfEnumType", "callOfEnumReturnType"], exact: [
        "toExponential",
        "toFixed",
        "toLocaleString",
        "toPrecision",
        "toString",
        "valueOf",
    ] }
);
