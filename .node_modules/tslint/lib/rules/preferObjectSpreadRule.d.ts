import * as ts from "typescript";
import * as Lint from "../index";
export declare class Rule extends Lint.Rules.AbstractRule {
    static metadata: Lint.IRuleMetadata;
    static FAILURE_STRING: string;
    static ASSIGNMENT_FAILURE_STRING: string;
    apply(sourceFile: ts.SourceFile): Lint.RuleFailure[];
}
