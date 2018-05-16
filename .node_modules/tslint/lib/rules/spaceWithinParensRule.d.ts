import * as ts from "typescript";
import * as Lint from "../index";
export declare class Rule extends Lint.Rules.AbstractRule {
    static metadata: Lint.IRuleMetadata;
    static FAILURE_NO_SPACE: string;
    static FAILURE_NEEDS_SPACE(count: number): string;
    static FAILURE_NO_EXTRA_SPACE(count: number): string;
    apply(sourceFile: ts.SourceFile): Lint.RuleFailure[];
}
