/// <reference path="fourslash.ts" />

//// let [|outter|] = 1;
//// do {
////     let [|inner|] = 1;
////     [|outter|]++;
////     /*a*/
//// } while (outter > 1);

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
            variableName: 'inner'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[2],
            variableName: 'outter'
        },
    ]
});
