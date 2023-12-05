// @target: es5
// @isolatedDeclarationDiffReason: Computed property are not resolved
enum E {
    member
}
var v = {
    [E.member]: 0
}