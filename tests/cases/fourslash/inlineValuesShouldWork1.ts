/// <reference path="fourslash.ts" />

//// function [|double|](n: number) { // eval('double') -> double()
////     return n * 2;
//// }
//// let [|x|] = 1; // InlineValueVariableLookup for x here
//// if ([|x === 2|]) { // eval(x === 2) -> false
////     x *= 2; // this line should NOT be evaluated since it's not the scope or its parents
//// }
//// if ([|x === 1|]) { // eval(x === 1) -> true
////     [|x|] *= 2; // InlineValueVariableLookup for x here
////     const [|y|] = {
////         z: [|x ** 2|], // eval(x ** 2) -> 16
////     };
////     console.log(x/*a*/); // <-- paused here
//// }

const ranges = test.ranges();

verify.getInlineValues({
    position: test.markerByName('a').position,
    expected: [
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[0],
            variableName: 'double'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[1],
            variableName: 'x'
        },
        {
            type: ts.InlineValueType.EvaluatableExpression,
            range: ranges[2],
            expression: 'x === 2'
        },
        {
            type: ts.InlineValueType.EvaluatableExpression,
            range: ranges[3],
            expression: 'x === 1'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[4],
            variableName: 'x'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[5],
            variableName: 'y'
        },
        {
            type: ts.InlineValueType.EvaluatableExpression,
            range: ranges[6],
            expression: 'x ** 2'
        },
    ]
});
