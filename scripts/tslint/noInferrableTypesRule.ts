/// <reference path="../../lib/typescriptServices.d.ts" />
/// <reference path="../../node_modules/tslint/lib/tslint.d.ts" />


export class Rule extends Lint.Rules.AbstractRule {
    public static FAILURE_STRING = "LHS type inferred by RHS expression, remove type annotation";

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        const program = ts.createProgram([sourceFile.fileName], Lint.createCompilerOptions());
        return this.applyWithWalker(new InferrableTypeWalker(sourceFile, this.getOptions(), program));
    }
}

class InferrableTypeWalker extends Lint.RuleWalker {
    constructor(file: ts.SourceFile, opts: Lint.IOptions, private program: ts.Program) {
        super(program.getSourceFile(file.fileName), opts);
    }

    visitVariableStatement(node: ts.VariableStatement) {
        node.declarationList.declarations.forEach(e => {
            if (
                (!!e.type) &&
                (!!e.initializer) &&
                (this.program.getTypeChecker().getTypeAtLocation(e.type) === this.program.getTypeChecker().getContextualType(e.initializer))
               ) {
                this.addFailure(this.createFailure(e.type.getStart(), e.type.getWidth(), Rule.FAILURE_STRING));
            }
        });
        
        super.visitVariableStatement(node);
    }
}
