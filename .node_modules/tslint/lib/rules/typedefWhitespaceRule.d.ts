import * as ts from "typescript";
import * as Lint from "../index";
export declare class Rule extends Lint.Rules.AbstractRule {
    static metadata: Lint.IRuleMetadata;
    static FAILURE_STRING(option: string, location: "before" | "after", type: string): string;
    apply(sourceFile: ts.SourceFile): Lint.RuleFailure[];
}
