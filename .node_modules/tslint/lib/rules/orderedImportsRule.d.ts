import * as ts from "typescript";
import * as Lint from "../index";
export declare class Rule extends Lint.Rules.AbstractRule {
    static metadata: Lint.IRuleMetadata;
    static IMPORT_SOURCES_NOT_GROUPED: string;
    static IMPORT_SOURCES_UNORDERED: string;
    static NAMED_IMPORTS_UNORDERED: string;
    apply(sourceFile: ts.SourceFile): Lint.RuleFailure[];
}
