import * as ts from "typescript";
import * as Lint from "../index";
export declare class Rule extends Lint.Rules.AbstractRule {
    static metadata: Lint.IRuleMetadata;
    static LOWERCASE_FAILURE: string;
    static UPPERCASE_FAILURE: string;
    static LEADING_SPACE_FAILURE: string;
    static IGNORE_WORDS_FAILURE_FACTORY: (words: string[]) => string;
    static IGNORE_PATTERN_FAILURE_FACTORY: (pattern: string) => string;
    apply(sourceFile: ts.SourceFile): Lint.RuleFailure[];
}
