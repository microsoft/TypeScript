// @declaration: true
// @isolatedDeclarationFixedDiffReason: Aliases are preserved for binding patterns GH#55654

interface C {
    ({p: name}): any;
    new ({p: boolean}): any;
}
