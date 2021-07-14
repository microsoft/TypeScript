/// <reference path='fourslash.ts'/>

// @strictNullChecks: true
// @exactOptionalPropertyTypes: true

//// interface I {
////     a?: number
//// }
//// interface IAny {
////     a?: any
//// }
//// interface IF {
////     a?: number
//// }
//// interface IC {
////     a?: number
//// }
//// interface IC2 {
////     a?: number
//// }
//// interface ICP {
////     a?: number
//// }
//// interface ID {
////     a?: number
//// }
//// interface J {
////     a?: number | undefined
//// }
//// declare var i: I
//// declare var iany: IAny
//// declare var if: IF
//// declare var j: J
//// i = j
//// iany = j
//// function fi(if_: IF) { return if_ }
//// fi(j)
//// class C {
////     ic: IC
////     ic2: IC2
////     m() { this.ic = j }
//// }
//// var c = new C()
//// c.ic2 = j
//// class CP {
////     #icp: ICP
////     m() { this.#icp = j }
//// }
//// declare var id: ID
//// ({ id } = { id: j })
//// declare var pd: PropertyDescriptor
//// interface PartialWrongPropertyDescriptor {
////     configurable?: boolean | undefined
//// }
//// declare var pwpd: PartialWrongPropertyDescriptor
//// pd = pwpd

verify.codeFixAll({
    fixId: "addOptionalPropertyUndefined",
    fixAllDescription: ts.Diagnostics.Add_undefined_to_all_optional_properties.message,
    newFileContent:
`interface I {
    a?: number | undefined
}
interface IAny {
    a?: any
}
interface IF {
    a?: number | undefined
}
interface IC {
    a?: number | undefined
}
interface IC2 {
    a?: number | undefined
}
interface ICP {
    a?: number | undefined
}
interface ID {
    a?: number
}
interface J {
    a?: number | undefined
}
declare var i: I
declare var iany: IAny
declare var if: IF
declare var j: J
i = j
iany = j
function fi(if_: IF) { return if_ }
fi(j)
class C {
    ic: IC
    ic2: IC2
    m() { this.ic = j }
}
var c = new C()
c.ic2 = j
class CP {
    #icp: ICP
    m() { this.#icp = j }
}
declare var id: ID
({ id } = { id: j })
declare var pd: PropertyDescriptor
interface PartialWrongPropertyDescriptor {
    configurable?: boolean | undefined
}
declare var pwpd: PartialWrongPropertyDescriptor
pd = pwpd`,
});

