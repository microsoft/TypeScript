/// <reference path="fourslash.ts" />

//// let [|outter|] = 1;
//// do {
////     let inner = 1;
////     outter++;
//// } while ([|outter > 1|] /*a*/);

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
            expression: 'outter > 1'
        }
    ]
});

