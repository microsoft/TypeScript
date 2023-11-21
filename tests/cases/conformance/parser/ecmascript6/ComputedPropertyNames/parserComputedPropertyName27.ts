//@target: ES6
//@isolatedDeclarationDiffReason: Invalid computed property can only be detected by TSC
class C {
    // No ASI
    [e]: number = 0
    [e2]: number
}