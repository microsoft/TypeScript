/// <reference path="fourslash.ts" />
//// let [|foo|] = 42;
//// let [|a|] = {
////     a: [|1|],
////     b: [|{
////         c: 2 + 3,
////         d: function foo () {
////             let e = 4;
////         },
////         foo
////     }|],
////     [|foo|]
//// }
//// /*a*/

const ranges = test.ranges();

verify.getInlineValues({
    position: test.markerByName('a').position,
    expected: [
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[0],
            variableName: 'foo'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[1],
            variableName: 'a'
        },
        {
            type: ts.InlineValueType.EvaluatableExpression,
            range: ranges[2],
            expression: '1'
        },
        {
            type: ts.InlineValueType.EvaluatableExpression,
            range: ranges[3],
            expression: '{ c: 2 + 3, d: function foo() { let e = 4; }, foo }'
        },
        {
            type: ts.InlineValueType.EvaluatableExpression,
            range: ranges[4],
            expression: 'foo'
        },
    ]
});
