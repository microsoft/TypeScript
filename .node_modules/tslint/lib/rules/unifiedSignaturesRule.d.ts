import * as ts from "typescript";
import * as Lint from "../index";
export declare class Rule extends Lint.Rules.AbstractRule {
    static metadata: Lint.IRuleMetadata;
    static FAILURE_STRING_OMITTING_SINGLE_PARAMETER(otherLine?: number): string;
    static FAILURE_STRING_OMITTING_REST_PARAMETER(otherLine?: number): string;
    static FAILURE_STRING_SINGLE_PARAMETER_DIFFERENCE(otherLine: number | undefined, type1: string, type2: string): string;
    private static FAILURE_STRING_START(otherLine?);
    apply(sourceFile: ts.SourceFile): Lint.RuleFailure[];
}
