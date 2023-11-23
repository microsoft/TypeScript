// @strict: true
// @declaration: true
// @isolatedDeclarationFixedDiffReason: Syntactically invalid.

const a: string | undefined = 'ff';
const foo = { a! }

const bar = {
    a ? () { }
}