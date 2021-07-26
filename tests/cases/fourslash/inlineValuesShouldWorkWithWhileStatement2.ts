/// <reference path="fourslash.ts" />

//// let [|outter|] = 1;
//// while ([|true|]) {
////     let [|inner1|] = 1;
////     [|outter|]++;
////     /*a*/
////     break;
//// }

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
            expression: 'true'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[2],
            variableName: 'inner1'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[3],
            variableName: 'outter'
        },
    ]
});
