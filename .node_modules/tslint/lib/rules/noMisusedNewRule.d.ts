import * as ts from "typescript";
import * as Lint from "../index";
export declare class Rule extends Lint.Rules.AbstractRule {
    static metadata: Lint.IRuleMetadata;
    static FAILURE_STRING_INTERFACE: string;
    static FAILURE_STRING_CLASS: string;
    apply(sourceFile: ts.SourceFile): Lint.RuleFailure[];
}
