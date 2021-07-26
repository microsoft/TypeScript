/// <reference path="fourslash.ts" />

//// const [|arr|] = [1, 2, 3]
//// for (let i = 0; i < arr.length; ++i) {
////     const value = arr[i]
//// }
//// /*a*/

const ranges = test.ranges();

verify.getInlineValues({
    position: test.markerByName('a').position,
    expected: [
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[0],
            variableName: 'arr'
        }
    ]
});
