/// <reference path='fourslash.ts'/>

// @strictNullChecks: true
// @exactOptionalPropertyTypes: true
//// interface ICP {
////     a?: number
//// }
//// interface J {
////     a?: number | undefined
//// }
//// declare var j: J
//// class CP {
////     #icp: ICP
////     m() { this.#icp/**/ = j; console.log(this.#icp) }
//// }
verify.codeFixAvailable([
    { description: ts.Diagnostics.Add_undefined_to_optional_property_type.message }
]);

verify.codeFix({
    description: ts.Diagnostics.Add_undefined_to_optional_property_type.message,
    index: 0,
    newFileContent:
`interface ICP {
    a?: number | undefined
}
interface J {
    a?: number | undefined
}
declare var j: J
class CP {
    #icp: ICP
    m() { this.#icp = j; console.log(this.#icp) }
}`,
});

