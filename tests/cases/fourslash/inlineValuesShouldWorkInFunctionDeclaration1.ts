/// <reference path="fourslash.ts" />

//// let [|outterVariable|] = 1
//// function [|outterFunctionDecl|] (a: number) {
////    let i = 2;
//// };
//// function [|foo|] ([|a|]: number, [|b|]: string, ...[|args|]: string[]) {
////     let [|innerVariable|] = 2;
////     /*a*/
//// }


const ranges = test.ranges();

verify.getInlineValues({
    position: test.markerByName('a').position,
    expected: [
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[0],
            variableName: 'outterVariable'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[1],
            variableName: 'outterFunctionDecl'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[2],
            variableName: 'foo'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[3],
            variableName: 'a'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[4],
            variableName: 'b'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[5],
            variableName: 'args'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[6],
            variableName: 'innerVariable'
        }
    ]
});
