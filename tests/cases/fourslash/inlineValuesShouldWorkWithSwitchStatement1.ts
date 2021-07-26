/// <reference path="fourslash.ts" />

//// let outter = 1;
//// switch ([|outter|]) {
////     case [|1|]:
////         let [|inner1|] = 1;
////         /*a*/
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
            type: ts.InlineValueType.VariableLookup,
            range: ranges[2],
            variableName: 'inner1'
        },
    ]
});

