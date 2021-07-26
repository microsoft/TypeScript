/// <reference path="fourslash.ts" />

//// let x = 1;
//// function foo (a: number) {
////     let y = 2;
////     function [|bar|] ([|b|]: number) {
////         let [|z|] = 3;
////         function [|baz|] ([|c|]: number) {
////             const [|value|] = a + b + c + x + y + z;
////             /*a*/ return value
////         }
////     }
//// }


const ranges = test.ranges();

verify.getInlineValues({
    position: test.markerByName('a').position,
    expected: [
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[0],
            variableName: 'bar'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[1],
            variableName: 'b'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[2],
            variableName: 'z'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[3],
            variableName: 'baz'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[4],
            variableName: 'c'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[5],
            variableName: 'value'
        }
    ]
});
