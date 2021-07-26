/// <reference path="fourslash.ts" />

//// let [|p|] = class C1 { }
//// let [|f|] = class C2 { }
//// /*a*/

const ranges = test.ranges();

verify.getInlineValues({
    position: test.markerByName('a').position,
    expected: [
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[0],
            variableName: 'p'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[1],
            variableName: 'f'
        }
    ]
});
