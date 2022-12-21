/// <reference path='fourslash.ts'/>

// @strictNullChecks: true
// @exactOptionalPropertyTypes: true
//// interface More {
////     a?: number
////     b?: number
//// }
//// interface J {
////     a?: number | undefined
//// }
//// declare var j: J
//// declare var more: More
//// more/**/ = j
verify.codeFixAvailable([
    { description: ts.Diagnostics.Add_undefined_to_optional_property_type.message }
]);

verify.codeFix({
    description: ts.Diagnostics.Add_undefined_to_optional_property_type.message,
    index: 0,
    newFileContent:
`interface More {
    a?: number | undefined
    b?: number | undefined
}
interface J {
    a?: number | undefined
}
declare var j: J
declare var more: More
more = j`,
});

