/// <reference path='fourslash.ts'/>

// @strictNullChecks: true
// @exactOptionalPropertyTypes: true
//// interface I {
////     a?: number
//// }
//// interface J {
////     a?: number | undefined
//// }
//// declare var i: I
//// declare var j: J
//// i/**/ = j
verify.codeFixAvailable([
    { description: ts.Diagnostics.Add_undefined_to_optional_property_type.message }
]);

verify.codeFix({
    description: ts.Diagnostics.Add_undefined_to_optional_property_type.message,
    index: 0,
    newFileContent:
`interface I {
    a?: number | undefined
}
interface J {
    a?: number | undefined
}
declare var i: I
declare var j: J
i = j`,
});

