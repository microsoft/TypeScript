/// <reference path="fourslash.ts" />

//// let x = 1;
//// if (x === 1) {
////     x = 2;
////     if ([|x === 2|]) {
////         [|x|] = 3;
////         if ([|x === 3|]) {
////             /*a*/
////         }
////     }
//// }

const ranges = test.ranges();

verify.getInlineValues({
    position: test.markerByName('a').position,
    expected: [
        {
            type: ts.InlineValueType.EvaluatableExpression,
            range: ranges[0],
            expression: 'x === 2'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[1],
            variableName: 'x'
        },
        {
            type: ts.InlineValueType.EvaluatableExpression,
            range: ranges[2],
            expression: 'x === 3'
        },
    ]
});
