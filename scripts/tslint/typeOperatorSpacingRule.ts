/// <reference path="../../node_modules/tslint/typings/typescriptServices.d.ts" />
/// <reference path="../../node_modules/tslint/lib/tslint.d.ts" />


export class Rule extends Lint.Rules.AbstractRule {
    public static FAILURE_STRING = "Place spaces around the '|' and '&' type operators";

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new TypeOperatorSpacingWalker(sourceFile, this.getOptions()));
    }
}

class TypeOperatorSpacingWalker extends Lint.RuleWalker {
    public visitNode(node: ts.Node) {
        if(node.kind === ts.SyntaxKind.UnionType || node.kind === ts.SyntaxKind.IntersectionType) {
            let typeNode = <ts.UnionOrIntersectionTypeNode>node;
            let expectedStart = typeNode.types[0].end + 2; // space, | or &
            for (let i = 1; i < typeNode.types.length; i++) {
                if(expectedStart !== typeNode.types[i].pos || typeNode.types[i].getLeadingTriviaWidth() !== 1) {
                    const failure = this.createFailure(typeNode.types[i].pos, typeNode.types[i].getWidth(), Rule.FAILURE_STRING);
                    this.addFailure(failure);
                }
                expectedStart = typeNode.types[i].end + 2;
            }
        }
        super.visitNode(node);
    }
}
