// @declaration: true
// @isolatedDeclarationFixedDiffReason: Printing differences
const Foo = {
    BANANA: 'banana' as 'banana',
}

export const Baa = {
    [Foo.BANANA]: 1
};