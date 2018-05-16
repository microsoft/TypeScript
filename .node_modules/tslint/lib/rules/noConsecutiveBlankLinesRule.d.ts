import * as ts from "typescript";
import * as Lint from "../index";
export declare class Rule extends Lint.Rules.AbstractRule {
    static DEFAULT_ALLOWED_BLANKS: number;
    static metadata: Lint.IRuleMetadata;
    static FAILURE_STRING_FACTORY(allowed: number): string;
    /**
     * Disable the rule if the option is provided but non-numeric or less than the minimum.
     */
    isEnabled(): boolean;
    apply(sourceFile: ts.SourceFile): Lint.RuleFailure[];
}
export declare function getTemplateRanges(sourceFile: ts.SourceFile): ts.TextRange[];
