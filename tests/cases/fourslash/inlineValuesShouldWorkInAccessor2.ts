/// <reference path="fourslash.ts" />

//// const outter = 1
//// class [|C1|] {
////     set getter ([|arg|]: number) {
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
            variableName: 'arg'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[2],
            variableName: 'inner'
        },
    ]
});
