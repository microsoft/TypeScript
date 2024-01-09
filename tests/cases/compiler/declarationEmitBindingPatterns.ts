// @declaration: true
// @isolatedDeclarationFixedDiffReason: #56992 Type printer preserves binding element aliases.

const k = ({x: z = 'y'}) => { }

var a;
function f({} = a, [] = a, { p: {} = a} = a) {
}