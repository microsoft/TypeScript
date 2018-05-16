import * as ts from "typescript";
import * as Lint from "../index";
export declare class Rule extends Lint.Rules.AbstractRule {
    static metadata: Lint.IRuleMetadata;
    static FAILURE_STRING(cbText: string): string;
    apply(sourceFile: ts.SourceFile): Lint.RuleFailure[];
}
