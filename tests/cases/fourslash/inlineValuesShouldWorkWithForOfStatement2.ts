/// <reference path="fourslash.ts" />

//// const [|arr|] = [ { a: [|1|] }];
//// for (const { [|a|] } of [|arr|]) {
////     const [|v|] = a + 1;
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
            type: ts.InlineValueType.EvaluatableExpression,
            range: ranges[1],
            expression: '1'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[2],
            variableName: 'a'
        },
        {
            type: ts.InlineValueType.EvaluatableExpression,
            range: ranges[3],
            expression: 'arr'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[4],
            variableName: 'v'
        },
    ]
});
