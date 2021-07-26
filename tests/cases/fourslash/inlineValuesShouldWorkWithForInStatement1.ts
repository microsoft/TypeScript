/// <reference path="fourslash.ts" />

//// const [|arr|] = [1, 2, 3]
//// for (const [|key|] in [|arr|]) {
////     const [|value|] = arr[key]
////     /*a*/
//// }


const ranges = test.ranges();

verify.getInlineValues({
    position: test.markerByName('a').position,
    expected: [
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[0],
            variableName: 'arr'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[1],
            variableName: 'key'
        },
        {
            type: ts.InlineValueType.EvaluatableExpression,
            range: ranges[2],
            expression: 'arr'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[3],
            variableName: 'value'
        },
    ]
});
