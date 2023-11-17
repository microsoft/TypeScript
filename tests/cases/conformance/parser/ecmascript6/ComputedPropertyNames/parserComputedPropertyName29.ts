//@target: ES6
//@isolatedDeclarationDiffReason: Invalid computed property can only be detected by TSC
class C {
    // yes ASI
    [e] = id++
    [e2]: number
}