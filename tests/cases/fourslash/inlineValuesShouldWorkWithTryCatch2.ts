/// <reference path="fourslash.ts" />

//// let [|outter|] = 1
//// try {
////     let inner1 = 1;
//// } catch ([|e|]) {
////     let [|inner2|] = 1;
////     /*a*/
//// } finally {
////     let inner3 = 1;
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
            variableName: 'e'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[2],
            variableName: 'inner2'
        },
    ]
});
