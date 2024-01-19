// @declaration: true
// @isolatedDeclarations: true
// @declarationMap: false
// @target: ESNext
// @isolatedDeclarationFixedDiffReason: Function declarations are not fixed.

export function foo() {}

foo.apply = () => {}
foo.call = ()=> {}
foo.bind = ()=> {}
foo.caller = ()=> {}
foo.toString = ()=> {}
foo.length = 10
foo.length = 10
