import * as ts from "typescript";
import * as Lint from "../index";
export declare class Rule extends Lint.Rules.OptionallyTypedRule {
    static metadata: Lint.IRuleMetadata;
    static FAILURE_STRING_ALPHABETICAL(name: string): string;
    static FAILURE_STRING_USE_DECLARATION_ORDER(propName: string, typeName: string | undefined): string;
    static FAILURE_STRING_SHORTHAND_FIRST(name: string): string;
    apply(sourceFile: ts.SourceFile): Lint.RuleFailure[];
    applyWithProgram(sourceFile: ts.SourceFile, program: ts.Program): Lint.RuleFailure[];
}
