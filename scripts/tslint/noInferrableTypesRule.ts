/// <reference path="../../node_modules/tslint/typings/typescriptServices.d.ts" />
/// <reference path="../../node_modules/tslint/lib/tslint.d.ts" />


export class Rule extends Lint.Rules.AbstractRule {
    public static FAILURE_STRING_FACTORY = (type: string) => `LHS type (${type}) inferred by RHS expression, remove type annotation`;

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new InferrableTypeWalker(sourceFile, this.getOptions()));
    }
}

class InferrableTypeWalker extends Lint.RuleWalker {
    private originalService: ts.LanguageService;
    private fileName: string;
    private originalContent: string;
    
    constructor(file: ts.SourceFile, opts: Lint.IOptions) {
        this.fileName = file.fileName;
        this.originalContent = file.getFullText();
        this.originalService = ts.createLanguageService(Lint.createLanguageServiceHost(this.fileName, this.originalContent));
        super(this.originalService.getSourceFile(this.fileName), opts);
    }

    visitVariableStatement(node: ts.VariableStatement) {
        node.declarationList.declarations.forEach(e => {
            if ((!!e.type) && (!!e.initializer)) {
                let failure: string;
                switch (e.type.kind) {
                    case ts.SyntaxKind.BooleanKeyword:
                        if (e.initializer.kind === ts.SyntaxKind.TrueKeyword || e.initializer.kind === ts.SyntaxKind.FalseKeyword) {
                            failure = 'boolean';
                        }
                    break;
                    case ts.SyntaxKind.NumberKeyword:
                        if (e.initializer.kind === ts.SyntaxKind.NumericLiteral) {
                            failure = 'number';
                        }
                    break;
                    case ts.SyntaxKind.StringKeyword:
                        if (e.initializer.kind === ts.SyntaxKind.StringLiteral || e.initializer.kind === ts.SyntaxKind.NoSubstitutionTemplateLiteral) {
                            failure = 'string';
                        }
                    break;
                }
                if (failure) {
                    this.addFailure(this.createFailure(e.type.getStart(), e.type.getWidth(), Rule.FAILURE_STRING_FACTORY(failure)));
                }
            }
        });

        super.visitVariableStatement(node);
    }
}
