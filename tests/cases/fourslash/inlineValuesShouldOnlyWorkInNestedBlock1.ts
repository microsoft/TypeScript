/// <reference path="fourslash.ts" />

//// function foo () {
////     let x = 1;
////     {
////         x = 2;
////         {
////             [|x|] = 3;
////             {
////                 [|x|] = 4;
////                 {
////                    [|x|] = 5;
////                    {
////                        [|x|] = 6;
////                        x;/*a*/
////                    }
////                 }
////             }
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
            variableName: 'x'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[1],
            variableName: 'x'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[2],
            variableName: 'x'
        },
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[3],
            variableName: 'x'
        }
    ]
});
