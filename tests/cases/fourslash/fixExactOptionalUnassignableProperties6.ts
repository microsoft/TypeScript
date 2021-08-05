/// <reference path='fourslash.ts'/>

// @strictNullChecks: true
// @exactOptionalPropertyTypes: true
// @Filename: fixExactOptionalUnassignableProperties6.ts
// based on snapshotterInjected.ts in microsoft/playwright
//// type Data = {
////     p?: (x: number) => void,
//// };
//// declare function e(o: any): Data;
//// e(101).p = undefined
verify.codeFixAvailable([
    { description: ts.Diagnostics.Add_undefined_to_optional_property_type.message }
]);

verify.codeFix({
    description: ts.Diagnostics.Add_undefined_to_optional_property_type.message,
    index: 0,
    newFileContent:
`type Data = {
    p?: ((x: number) => void) | undefined,
};
declare function e(o: any): Data;
e(101).p = undefined`,
});
