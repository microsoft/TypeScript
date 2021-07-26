/// <reference path="fourslash.ts" />

//// class [|C1|] { }
//// class [|C2|] { }
//// /*a*/


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
            variableName: 'C2'
        },
    ]
});
