import * as ts from "typescript";
import * as Lint from "..";
export declare class Rule extends Lint.Rules.AbstractRule {
    static metadata: Lint.IRuleMetadata;
    static LONGHAND_PROPERTY: string;
    static LONGHAND_METHOD: string;
    static SHORTHAND_ASSIGNMENT: string;
    apply(sourceFile: ts.SourceFile): Lint.RuleFailure[];
}
