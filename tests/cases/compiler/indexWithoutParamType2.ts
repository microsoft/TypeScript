// @isolatedDeclarationDiffReason: Invalid computed property can only be detected by TSC
class C {
    // Used to be indexer, now it is a computed property
    [x]: string
}