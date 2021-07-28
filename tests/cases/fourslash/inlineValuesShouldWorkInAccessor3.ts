/// <reference path="fourslash.ts" />

//// const [|outter|] = 1
//// const [|obj|] = {
////     get getter () {
////         const [|inner|] = 2;
////         /*a*/
////     }
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
            type: ts.InlineValueType.VariableLookup,
            range: ranges[2],
            variableName: 'inner'
        },
    ]
});
