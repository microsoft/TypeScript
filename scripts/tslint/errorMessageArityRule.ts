/// <reference path="../../node_modules/tslint/typings/typescriptServices.d.ts" />
/// <reference path="../../node_modules/tslint/lib/tslint.d.ts" />

export class Rule extends Lint.Rules.AbstractRule {
    public static ARITY_FAILURE_STRING = "Provided argument count does not match the number of formatting holes";

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new ErrorMessageWalker(sourceFile, this.getOptions()));
    }
}

class ErrorMessageWalker extends Lint.RuleWalker {
    public visitCallExpression(node: ts.CallExpression) {
        let rx = /(?:^|_)(\d)(?:_|$)/g;

        if (node.expression.getText() === 'error' && node.arguments.length >= 2) {
            const errorMessage = node.arguments[1];
            if(errorMessage.kind === ts.SyntaxKind.PropertyAccessExpression) {
                if ((<ts.PropertyAccessExpression>errorMessage).expression.getText() === 'Diagnostics') {
                    const errorMessage = (<ts.PropertyAccessExpression>node.arguments[1]).name.getText();
                    let arity = 0;
                    let match = rx.exec(errorMessage);
                    while (match) {
                        let num = +match[1];
                        if (num !== 5 && num !== 6) {
                            arity = Math.max(arity, num + 1);
                        }
                        match = rx.exec(errorMessage);
                    }
                    if (node.arguments.length !== arity + 2) {
                        console.log('Expected ' + arity + ' but saw ' + node.arguments.length + ' for ' + errorMessage);
                        const failure = this.createFailure(node.getStart(), node.getWidth(), Rule.ARITY_FAILURE_STRING);
                        this.addFailure(failure);
                    }
                }
            }
        }

        super.visitCallExpression(node);
    }
}
