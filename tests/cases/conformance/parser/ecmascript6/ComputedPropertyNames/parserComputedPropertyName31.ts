//@target: ES6
//@isolatedDeclarationDiffReason: Invalid computed property can only be detected by TSC
class C {
    // yes ASI
    [e]: number
    [e2]: number
}