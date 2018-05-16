import * as ts from "typescript";
import * as Lint from "../index";
export declare class Rule extends Lint.Rules.AbstractRule {
    static metadata: Lint.IRuleMetadata;
    static ADD_SPACE_AFTER_IMPORT: string;
    static TOO_MANY_SPACES_AFTER_IMPORT: string;
    static ADD_SPACE_AFTER_STAR: string;
    static TOO_MANY_SPACES_AFTER_STAR: string;
    static ADD_SPACE_AFTER_FROM: string;
    static TOO_MANY_SPACES_AFTER_FROM: string;
    static ADD_SPACE_BEFORE_FROM: string;
    static TOO_MANY_SPACES_BEFORE_FROM: string;
    static NO_LINE_BREAKS: string;
    apply(sourceFile: ts.SourceFile): Lint.RuleFailure[];
}
