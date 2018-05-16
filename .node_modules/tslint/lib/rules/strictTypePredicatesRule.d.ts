import * as ts from "typescript";
import * as Lint from "../index";
export declare class Rule extends Lint.Rules.TypedRule {
    static metadata: Lint.IRuleMetadata;
    static FAILURE_STRING_BAD_TYPEOF: string;
    static FAILURE_STRING(value: boolean): string;
    static FAILURE_STRICT_PREFER_STRICT_EQUALS(value: "null" | "undefined", isPositive: boolean): string;
    applyWithProgram(sourceFile: ts.SourceFile, program: ts.Program): Lint.RuleFailure[];
}
