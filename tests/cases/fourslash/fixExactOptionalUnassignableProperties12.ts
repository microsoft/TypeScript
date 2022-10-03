/// <reference path='fourslash.ts'/>

// @strictNullChecks: true
// @exactOptionalPropertyTypes: true
//// interface IC2 {
////     a?: number
//// }
//// interface J {
////     a?: number | undefined
//// }
//// declare var j: J
//// class C {
////     ic2: IC2
//// }
//// var c = new C()
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
class C {
    ic2: IC2
}
var c = new C()
c.ic2 = j`,
});

