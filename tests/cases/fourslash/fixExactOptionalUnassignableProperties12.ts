/// <reference path='fourslash.ts'/>

// @strict: false
// @strictNullChecks: true
// @exactOptionalPropertyTypes: true
//// interface IC2 {
////     a?: number
//// }
//// interface J {
////     a?: number | undefined
//// }
//// declare var j: J
//// interface C {
////     ic2: IC2
//// }
//// declare var c: C
//// c.ic2/**/ = j
verify.codeFixAvailable([
    { description: ts.Diagnostics.Add_undefined_to_optional_property_type.message }
]);

verify.codeFix({
    description: ts.Diagnostics.Add_undefined_to_optional_property_type.message,
    index: 0,
    newFileContent:
`interface IC2 {
    a?: number | undefined
}
interface J {
    a?: number | undefined
}
declare var j: J
interface C {
    ic2: IC2
}
declare var c: C
c.ic2 = j`,
});

