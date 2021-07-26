/// <reference path="fourslash.ts" />

//// let outter = 1;
//// switch ([|outter|]) {
////     case [|1|]: {
////         let inner1 = 1;
////         break;
////     }
////     case [|2|]:
////         let [|inner2|] = 1;
////         /*a*/
////         break;
////     case [|3|]:
////         let inner3 = 1;
////         break;
////     default:
////         let inner5 = 42;
////         break;
//// }

const ranges = test.ranges();

verify.getInlineValues({
    position: test.markerByName('a').position,
    expected: [
        {
            type: ts.InlineValueType.EvaluatableExpression,
            range: ranges[0],
            expression: 'outter'
        },
        {
            type: ts.InlineValueType.EvaluatableExpression,
            range: ranges[1],
            expression: '1'
        },
        {
            type: ts.InlineValueType.EvaluatableExpression,
            range: ranges[2],
            expression: '2'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[3],
            variableName: 'inner2'
        },
        {
            type: ts.InlineValueType.EvaluatableExpression,
            range: ranges[4],
            expression: '3'
        },
    ]
});

