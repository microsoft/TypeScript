import * as ts from "typescript";
import * as Lint from "../index";
export declare class Rule extends Lint.Rules.AbstractRule {
    static DEFAULT_THRESHOLD: number;
    static MINIMUM_THRESHOLD: number;
    static metadata: Lint.IRuleMetadata;
    static FAILURE_STRING(expected: number, actual: number, name?: string): string;
    apply(sourceFile: ts.SourceFile): Lint.RuleFailure[];
    isEnabled(): boolean;
    private readonly threshold;
}
