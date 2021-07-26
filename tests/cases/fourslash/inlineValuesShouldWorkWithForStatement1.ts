/// <reference path="fourslash.ts" />

//// const [|arr|] = [1, 2, 3]
//// for (let [|i|] = 0; [|i < arr.length|]; ++[|i|]) {
////     const [|value|] = arr[i]
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
            variableName: 'i'
        },
        {
            type: ts.InlineValueType.EvaluatableExpression,
            range: ranges[2],
            expression: 'i < arr.length'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[3],
            variableName: 'i'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[4],
            variableName: 'value'
        },
    ]
});
