/// <reference path="fourslash.ts" />

//// declare const [|value|]: any
//// const { [|a|], b: { [|c|], d: [|e|] }, [|f|] = 1 } = value;
//// const [ [|f1|], , [|f2|], [[|f3|], [|f4|]], [|f5|] = 1] = value;
//// const {} = value;
//// const [] = value;
//// /*a*/

const ranges = test.ranges();

verify.getInlineValues({
    position: test.markerByName('a').position,
    expected: [
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[0],
            variableName: 'value'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[1],
            variableName: 'a'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[2],
            variableName: 'c'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[3],
            variableName: 'e'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[4],
            variableName: 'f'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[5],
            variableName: 'f1'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[6],
            variableName: 'f2'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[7],
            variableName: 'f3'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[8],
            variableName: 'f4'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[9],
            variableName: 'f5'
        },
    ]
});
