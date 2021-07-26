/// <reference path="fourslash.ts" />

//// let [|a|]= 1;
//// let [|b|] = 2;
//// let [|c|] = 3, [|d|] = 4;
//// /*a*/;
//// let e = 5;
//// let f = 6;

const ranges = test.ranges();

verify.getInlineValues({
    position: test.markerByName('a').position,
    expected: [
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[0],
            variableName: 'a'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[1],
            variableName: 'b'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[2],
            variableName: 'c'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[3],
            variableName: 'd'
        },
    ]
});
