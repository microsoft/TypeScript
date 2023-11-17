//@target: ES6
//@isolatedDeclarationDiffReason: Invalid computed property can only be detected by TSC
declare class C {
    get [e](): number 
}