import * as Lint from "tslint/lib";
import * as ts from "typescript";

export class Rule extends Lint.Rules.AbstractRule {
    public static FAILURE_STRING = "This file has a BOM.";

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithFunction(sourceFile, walk);
    }
}

function walk(ctx: Lint.WalkContext<void>): void {
    if (ctx.sourceFile.text[0] === "\ufeff") {
        ctx.addFailure(0, 1, Rule.FAILURE_STRING);
    }
}
