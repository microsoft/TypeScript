import * as Lint from "tslint/lib/lint";
import * as ts from "typescript";

export class Rule extends Lint.Rules.AbstractRule {
    public static getReplacement(name: string): string {
        let replacement: string;
        switch (name) {
            case "Number":
                replacement = "number";
                break;
            case "Boolean":
                replacement = "boolean";
                break;
            case "String":
                replacement = "string";
                break;
        }
        return replacement;
    }
    public static FAILURE_STRING_FACTORY = (name: string, replacement: string) => `Use of non primitive name '${name}' is not allowed - use '${replacement}' instead`;

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new EnforcePrimitiveNames(sourceFile, this.getOptions()));
    }
}

class EnforcePrimitiveNames extends Lint.RuleWalker {
    visitIdentifier(node: ts.Identifier): void {
        super.visitIdentifier(node);
        if (node.text === "Number" || node.text === "Boolean" || node.text === "String") {
            if (node.parent && node.parent.kind === ts.SyntaxKind.TypeReference) {
                this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING_FACTORY(node.text, Rule.getReplacement(node.text))));
            }
        }
    }
}
