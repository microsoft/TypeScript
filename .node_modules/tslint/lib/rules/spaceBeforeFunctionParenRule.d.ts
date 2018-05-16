import * as ts from "typescript";
import * as Lint from "../index";
export declare class Rule extends Lint.Rules.AbstractRule {
    static metadata: Lint.IRuleMetadata;
    static INVALID_WHITESPACE_ERROR: string;
    static MISSING_WHITESPACE_ERROR: string;
    apply(sourceFile: ts.SourceFile): Lint.RuleFailure[];
}
