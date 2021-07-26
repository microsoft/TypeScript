/// <reference path="fourslash.ts" />

//// const [|arr|] = [1, 2, 3]
//// for (let [|i|] = 0, [|j|] = 0; [|i < arr.length && j < arr.length|]; ++[|i|], ++[|j|]) {
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
            type: ts.InlineValueType.VariableLookup,
            range: ranges[2],
            variableName: 'j'
        },
        {
            type: ts.InlineValueType.EvaluatableExpression,
            range: ranges[3],
            expression: 'i < arr.length && j < arr.length'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[4],
            variableName: 'i'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[5],
            variableName: 'j'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[6],
            variableName: 'value'
        },
    ]
});
