import * as ts from "typescript";
import * as Lint from "../index";
export declare class Rule extends Lint.Rules.AbstractRule {
    static metadata: Lint.IRuleMetadata;
    static FAILURE_STRING_MISSING: string;
    static FAILURE_STRING_COMMA: string;
    static FAILURE_STRING_TRAILING: string;
    apply(sourceFile: ts.SourceFile): Lint.RuleFailure[];
}
