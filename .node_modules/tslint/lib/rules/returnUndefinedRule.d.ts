import * as ts from "typescript";
import * as Lint from "../index";
export declare class Rule extends Lint.Rules.TypedRule {
    static metadata: Lint.IRuleMetadata;
    static FAILURE_STRING_VALUE_RETURN: string;
    static FAILURE_STRING_VOID_RETURN: string;
    applyWithProgram(sourceFile: ts.SourceFile, program: ts.Program): Lint.RuleFailure[];
}
