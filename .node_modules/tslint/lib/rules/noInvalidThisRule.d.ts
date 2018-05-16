import * as ts from "typescript";
import * as Lint from "..";
export declare class Rule extends Lint.Rules.AbstractRule {
    static metadata: Lint.IRuleMetadata;
    static FAILURE_STRING_OUTSIDE: string;
    static FAILURE_STRING_INSIDE: string;
    apply(sourceFile: ts.SourceFile): Lint.RuleFailure[];
}
