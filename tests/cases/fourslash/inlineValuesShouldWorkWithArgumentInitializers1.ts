

/// <reference path="fourslash.ts" />

//// const [|outter|] = 1;
//// function [|foo|] ([|a|] = 1, /*a*/b = 2, c = 3) {
////     const inner = 1
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
            variableName: 'foo'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[2],
            variableName: 'a'
        }
    ]
});
