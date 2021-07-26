/// <reference path="fourslash.ts" />

//// let [|p|] = function f(b: string) {
////     let i = 3;
//// }
//// let [|f|] = function ff ([|a|]: string) {
////     let [|inner|] = 2;
////     /*a*/
//// }


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
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[2],
            variableName: 'a'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[3],
            variableName: 'inner'
        },
    ]
});
