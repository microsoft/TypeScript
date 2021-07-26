/// <reference path="fourslash.ts" />

//// let [|outter|] = 1;
//// switch ([|outter|]) {
////     case 1: {
////         let inner1 = 1;
////         break;
////     }
////     case 2:
////         let inner2 = 1;
////         break;
////     case 3:
////         let inner3 = 1;
////         break;
////     default:
////         let inner5 = 42;
////         break;
//// }
//// /*a*/
const ranges = test.ranges();

verify.getInlineValues({
    position: test.markerByName('a').position,
    expected: [
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[0],
            variableName: 'outter'
        },
        {
            type: ts.InlineValueType.EvaluatableExpression,
            range: ranges[1],
            expression: 'outter'
        },
    ]
});

