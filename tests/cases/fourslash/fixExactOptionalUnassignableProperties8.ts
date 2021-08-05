/// <reference path='fourslash.ts'/>

// @strictNullChecks: true
// @exactOptionalPropertyTypes: true
// @Filename: fixExactOptionalUnassignableProperties6.ts
// based on snapshotterInjected.ts in microsoft/playwright
//// type Data = {
////     x?: {
////         y?: number
////     }
//// }
//// declare var d: Data
//// d.x = { y: undefined }
verify.codeFixAvailable([
    { description: ts.Diagnostics.Add_undefined_to_optional_property_type.message }
]);
verify.codeFix({
    description: ts.Diagnostics.Add_undefined_to_optional_property_type.message,
    index: 0,
    newFileContent:
`type Data = {
    x?: {
        y?: number | undefined
    }
}
declare var d: Data
d.x = { y: undefined }`,
});

