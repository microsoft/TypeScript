import * as Lint from "tslint/lib/lint";
import * as ts from "typescript";

export class Rule extends Lint.Rules.AbstractRule {
    public static FAILURE_STRING_FACTORY = (name: string, currently: string) => `Tag boolean argument as '${name}' (currently '${currently}')`;

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        const program = ts.createProgram([sourceFile.fileName], Lint.createCompilerOptions());
        const checker = program.getTypeChecker();
        return this.applyWithWalker(new BooleanTriviaWalker(checker, program.getSourceFile(sourceFile.fileName), this.getOptions()));
    }
}

class BooleanTriviaWalker extends Lint.RuleWalker {
    constructor(private checker: ts.TypeChecker, file: ts.SourceFile, opts: Lint.IOptions) {
        super(file, opts);
    }

    visitCallExpression(node: ts.CallExpression) {
        super.visitCallExpression(node);
        if (node.arguments) {
            const targetCallSignature = this.checker.getResolvedSignature(node);
            if (!!targetCallSignature) {
                const targetParameters = targetCallSignature.getParameters();
                const source = this.getSourceFile();
                for (let index = 0; index < targetParameters.length; index++) {
                    const param = targetParameters[index];
                    const arg = node.arguments[index];
                    if (!(arg && param)) continue;

                    const argType = this.checker.getContextualType(arg);
                    if (argType && (argType.getFlags() & ts.TypeFlags.Boolean)) {
                        if (arg.kind !== ts.SyntaxKind.TrueKeyword && arg.kind !== ts.SyntaxKind.FalseKeyword) {
                            continue;
                        }
                        let triviaContent: string;
                        const ranges = ts.getLeadingCommentRanges(arg.getFullText(), 0);
                        if (ranges && ranges.length === 1 && ranges[0].kind === ts.SyntaxKind.MultiLineCommentTrivia) {
                            triviaContent = arg.getFullText().slice(ranges[0].pos + 2, ranges[0].end - 2); // +/-2 to remove /**/
                        }
                        if (triviaContent !== param.getName()) {
                            this.addFailure(this.createFailure(arg.getStart(source), arg.getWidth(source), Rule.FAILURE_STRING_FACTORY(param.getName(), triviaContent)));
                        }
                    }
                }
            }
        }
    }
}
