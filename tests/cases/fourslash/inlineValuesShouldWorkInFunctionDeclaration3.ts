/// <reference path="fourslash.ts" />

//// export function [|foo|] () {
////     let [|inner|] = 1;
////     /*a*/
//// }

const ranges = test.ranges();

verify.getInlineValues({
    position: test.markerByName('a').position,
    expected: [
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[0],
            variableName: 'foo'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[1],
            variableName: 'inner'
        },
    ]
});
