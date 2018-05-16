import * as ts from "typescript";
import * as Lint from "../index";
export declare class Rule extends Lint.Rules.AbstractRule {
    static metadata: Lint.IRuleMetadata;
    static INCONSISTENT_PROPERTY: string;
    static UNNEEDED_QUOTES(name: string): string;
    static UNQUOTED_PROPERTY(name: string): string;
    apply(sourceFile: ts.SourceFile): Lint.RuleFailure[];
}
