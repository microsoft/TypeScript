// @target: es5
// @declaration: true
// @isolatedDeclarations: false
// @isolatedDeclarationDiffReason: TODO: Negative number causes issue. GH#56562
var v = {
  [-1]: {},
  [+1]: {},
  [~1]: {},
  [!1]: {}
}
