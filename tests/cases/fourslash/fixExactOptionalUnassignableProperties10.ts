/// <reference path='fourslash.ts'/>

// @strictNullChecks: true
// @exactOptionalPropertyTypes: true
//// interface IF {
////     a?: number
//// }
//// interface J {
////     a?: number | undefined
//// }
//// declare var j: J
//// function fi(if_: IF) { return if_ }
//// fi(j/**/)
verify.codeFixAvailable([
    { description: ts.Diagnostics.Add_undefined_to_optional_property_type.message }
]);

verify.codeFix({
    description: ts.Diagnostics.Add_undefined_to_optional_property_type.message,
    index: 0,
    newFileContent:
`interface IF {
    a?: number | undefined
}
interface J {
    a?: number | undefined
}
declare var j: J
function fi(if_: IF) { return if_ }
fi(j)`,
});

