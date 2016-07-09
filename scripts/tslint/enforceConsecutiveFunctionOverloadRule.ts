import * as Lint from "tslint/lib/lint";
import * as ts from "typescript";

export class Rule extends Lint.Rules.AbstractRule {

    public static FAILURE_STRING_FACTORY = (name: string) => `All '${name}' signatures should be adjacent`;

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new NoNonConsecutiveFunctionOverload(sourceFile, this.getOptions()));
    }
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
            if (member.name != undefined && member.name.kind === ts.SyntaxKind.Identifier) {
                this.handleIdentifier(<ts.Identifier>member.name);
            }
        }
        super.visitInterfaceDeclaration(node);
    }

    handleIdentifier(node: ts.Identifier) {
        const methodName = node.text;
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
