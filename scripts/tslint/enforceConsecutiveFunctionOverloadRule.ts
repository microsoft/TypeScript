import * as Lint from "tslint/lib/lint";
import * as ts from "typescript";

export class Rule extends Lint.Rules.AbstractRule {

    public static FAILURE_STRING_FACTORY = (name: string) => `All '${name}' signatures should be adjacent`;

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new NoNonConsecutiveFunctionOverload(sourceFile, this.getOptions()));
    }
}

function isStringOrNumericLiteral(kind: number) {
    return kind === 9 || kind === 8;
}

function getTextOfPropertyName(name: ts.PropertyName): string {
    switch (name.kind) {
        case ts.SyntaxKind.Identifier:
            return (<ts.Identifier>name).text;
        case ts.SyntaxKind.StringLiteral:
        case ts.SyntaxKind.NumericLiteral:
            return (<ts.LiteralExpression>name).text;
        case ts.SyntaxKind.ComputedPropertyName:
            if (isStringOrNumericLiteral((<ts.ComputedPropertyName>name).expression.kind)) {
                return (<ts.LiteralExpression>(<ts.ComputedPropertyName>name).expression).text;
            }
    }

    return undefined;
}

class NoNonConsecutiveFunctionOverload extends Lint.BlockScopeAwareRuleWalker<{}, ScopeInfo> {

    createScope(): any {
        return undefined;
    }

    createBlockScope(): ScopeInfo {
        return new ScopeInfo();
    }

    visitInterfaceDeclaration(node: ts.InterfaceDeclaration): void {
        const members = node.members;
        for (const member of members) {
            if (member.name != undefined) {
                const methodName = getTextOfPropertyName(member.name);
                if (methodName != undefined) {
                    this.handleMethodName(member, methodName);
                }
            }
        }
        super.visitInterfaceDeclaration(node);
    }

    handleMethodName(node: ts.Node, methodName: string) {
        const currentBlockScope = this.getCurrentBlockScope();
        const lastPosition = currentBlockScope.methodNames.lastIndexOf(methodName);
        if (lastPosition >= 0 && lastPosition != (currentBlockScope.methodNames.length - 1)) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING_FACTORY(methodName)));
        }
        currentBlockScope.methodNames.push(methodName);
    }
}

class ScopeInfo {
    public methodNames: string[] = [];
}
