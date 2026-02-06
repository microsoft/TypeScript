/// <reference path='fourslash.ts'/>

// @strict: false
// @strictNullChecks: true
// @exactOptionalPropertyTypes: true
//// interface IC {
////     a?: number
//// }
//// interface J {
////     a?: number | undefined
//// }
//// declare var j: J
//// class C {
////     ic: IC
////     constructor() { this.ic/**/ = j }
//// }
verify.codeFixAvailable([
    { description: ts.Diagnostics.Add_undefined_to_optional_property_type.message }
]);

verify.codeFix({
    description: ts.Diagnostics.Add_undefined_to_optional_property_type.message,
    index: 0,
    newFileContent:
`interface IC {
    a?: number | undefined
}
interface J {
    a?: number | undefined
}
declare var j: J
class C {
    ic: IC
    constructor() { this.ic = j }
}`,
});

