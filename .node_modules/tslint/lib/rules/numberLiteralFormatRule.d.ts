import * as ts from "typescript";
import * as Lint from "../index";
export declare class Rule extends Lint.Rules.AbstractRule {
    static metadata: Lint.IRuleMetadata;
    static FAILURE_STRING_LEADING_0: string;
    static FAILURE_STRING_TRAILING_0: string;
    static FAILURE_STRING_TRAILING_DECIMAL: string;
    static FAILURE_STRING_LEADING_DECIMAL: string;
    static FAILURE_STRING_NOT_UPPERCASE: string;
    apply(sourceFile: ts.SourceFile): Lint.RuleFailure[];
}
