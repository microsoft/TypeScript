import * as ts from "typescript";
import * as Lint from "tslint";

export class Rule extends Lint.Rules.TypedRule {
    public applyWithProgram(sourceFile: ts.SourceFile, program: ts.Program): Lint.RuleFailure[] {
        return this.applyWithFunction(sourceFile, ctx => walk(ctx, program.getTypeChecker()));
    }
}

function walk(ctx: Lint.WalkContext<void>, checker: ts.TypeChecker): void {
    ctx.sourceFile.forEachChild(function cb(node) {
        if (ts.isArrayLiteralExpression(node) && node.elements.length === 0) {
            const ct = checker.getContextualType(node);
            if (ct) {
                const str = checker.typeToString(ct);
                if (str.startsWith("ReadonlyArray<") && str.endsWith(">")) {
                    ctx.addFailureAtNode(node, "Use `emptyArray` instead", Lint.Replacement.replaceNode(node, "emptyArray"));
                }
            }
            else {
                // Allow `const x = [];` as this is almost certain to be pushed to
                if (!ts.isVariableDeclaration(node.parent)) {
                    ctx.addFailureAtNode(node, "Array literal has no contextual type -- not sure if this should be `emptyArray`.");
                }
            }
        }
        node.forEachChild(cb);
    });
}
