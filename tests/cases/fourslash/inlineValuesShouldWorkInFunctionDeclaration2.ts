/// <reference path="fourslash.ts" />

//// export default function () {
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
            variableName: 'inner'
        },
    ]
});
