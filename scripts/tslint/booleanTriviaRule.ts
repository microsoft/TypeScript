import * as Lint from "tslint/lib";
import * as ts from "typescript";

export class Rule extends Lint.Rules.AbstractRule {
    public static FAILURE_STRING_FACTORY(name: string, currently?: string): string {
        const current = currently ? ` (currently '${currently}')` : "";
        return `Tag boolean argument as '${name}'${current}`;
    }

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        // Cheat to get type checker
        const program = ts.createProgram([sourceFile.fileName], Lint.createCompilerOptions());
        const checker = program.getTypeChecker();
        return this.applyWithFunction(program.getSourceFile(sourceFile.fileName), ctx => walk(ctx, checker));
    }
}

function walk(ctx: Lint.WalkContext<void>, checker: ts.TypeChecker): void {
    ts.forEachChild(ctx.sourceFile, recur);
    function recur(node: ts.Node): void {
        if (node.kind === ts.SyntaxKind.CallExpression) {
            checkCall(node as ts.CallExpression);
        }
        ts.forEachChild(node, recur);
    }

    function checkCall(node: ts.CallExpression): void {
        if (!node.arguments || !node.arguments.some(arg => arg.kind === ts.SyntaxKind.TrueKeyword || arg.kind === ts.SyntaxKind.FalseKeyword)) {
            return;
        }

        const targetCallSignature = checker.getResolvedSignature(node);
        if (!targetCallSignature) {
            return;
        }

        const targetParameters = targetCallSignature.getParameters();
        for (let index = 0; index < targetParameters.length; index++) {
            const param = targetParameters[index];
            const arg = node.arguments[index];
            if (!(arg && param)) {
                continue;
            }

            const argType = checker.getContextualType(arg);
            if (argType && (argType.getFlags() & ts.TypeFlags.Boolean)) {
                if (arg.kind !== ts.SyntaxKind.TrueKeyword && arg.kind !== ts.SyntaxKind.FalseKeyword) {
                    continue;
                }
                let triviaContent: string | undefined;
                const ranges = ts.getLeadingCommentRanges(arg.getFullText(), 0);
                if (ranges && ranges.length === 1 && ranges[0].kind === ts.SyntaxKind.MultiLineCommentTrivia) {
                    triviaContent = arg.getFullText().slice(ranges[0].pos + 2, ranges[0].end - 2); // +/-2 to remove /**/
                }

                const paramName = param.getName();
                if (triviaContent !== paramName && triviaContent !== paramName + ":") {
                    ctx.addFailureAtNode(arg, Rule.FAILURE_STRING_FACTORY(param.getName(), triviaContent));
                }
            }
        }
    }
}