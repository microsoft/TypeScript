/// <reference path="fourslash.ts" />

//// const outter = 1
//// class [|C1|] {
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
            variableName: 'C1'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[1],
            variableName: 'inner'
        },
    ]
});
