/// <reference path="fourslash.ts" />

//// const [|outter|] = 1
//// const [|obj|] = {
////     property: [|1|],
////     method ([|arg|]: number) {
////         if ([|this.property|]) { }
////         /*a*/
////     },
////     property2: 2,
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
            type: ts.InlineValueType.VariableLookup,
            range: ranges[1],
            variableName: 'obj'
        },
        {
            type: ts.InlineValueType.EvaluatableExpression,
            range: ranges[2],
            expression: '1'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[3],
            variableName: 'arg'
        },
        {
            type: ts.InlineValueType.EvaluatableExpression,
            range: ranges[4],
            expression: 'this.property'
        },
    ]
});
