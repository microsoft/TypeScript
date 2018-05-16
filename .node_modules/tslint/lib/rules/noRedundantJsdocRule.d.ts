import * as ts from "typescript";
import * as Lint from "../index";
export declare class Rule extends Lint.Rules.AbstractRule {
    static metadata: Lint.IRuleMetadata;
    static FAILURE_STRING_REDUNDANT_TYPE: string;
    static FAILURE_STRING_REDUNDANT_TAG(tagName: string): string;
    static FAILURE_STRING_NO_COMMENT(tagName: string): string;
    apply(sourceFile: ts.SourceFile): Lint.RuleFailure[];
}
