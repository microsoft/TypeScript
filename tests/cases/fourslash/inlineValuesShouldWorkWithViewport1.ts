/// <reference path="fourslash.ts" />

//// function double(n: number) { // eval('double') -> double()
////     return n * 2;
//// }
//// let x = 1; // InlineValueVariableLookup for x here
//// /*viewPortStart*/if ([|x === 2|]) { // eval(x === 2) -> false
////     x *= 2; // this line should NOT be evaluated since it's not the scope or its parents
//// }
//// if ([|x === 1|]) { // eval(x === 1) -> true
////     [|x|] *= 2; // InlineValueVariableLookup for x here
////     const [|y|] = {
////         z: [|x ** 2|], // eval(x ** 2) -> 16
////     };
////     console.log(x/*a*/); // <-- paused here
//// }/*viewPortEnd*/

const ranges = test.ranges();
const start = test.markerByName('viewPortStart').position;
const end = test.markerByName('viewPortEnd').position;

verify.getInlineValues({
    position: test.markerByName('a').position,
    textSpan: {
        start,
        length: end - start
    },
    expected: [
        {
            type: ts.InlineValueType.EvaluatableExpression,
            range: ranges[0],
            expression: 'x === 2'
        },
        {
            type: ts.InlineValueType.EvaluatableExpression,
            range: ranges[1],
            expression: 'x === 1'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[2],
            variableName: 'x'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[3],
            variableName: 'y'
        },
        {
            type: ts.InlineValueType.EvaluatableExpression,
            range: ranges[4],
            expression: 'x ** 2'
        },
    ]
});
