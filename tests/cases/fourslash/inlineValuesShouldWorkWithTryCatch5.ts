/// <reference path="fourslash.ts" />

//// let [|outter|] = 1
//// try {
////     let inner1 = 1;
//// } catch (e) {
////     let inner2 = 1;
//// } finally {
////     let inner3 = 1;
//// }
//// /*a*/

const ranges = test.ranges();

verify.getInlineValues({
    position: test.markerByName('a').position,
    expected: [
        {
            type: ts.InlineValueType.VariableLookup,
            range: ranges[0],
            variableName: 'outter'
        }
    ]
});
