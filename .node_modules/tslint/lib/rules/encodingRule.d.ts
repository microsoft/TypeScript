import * as ts from "typescript";
import * as Lint from "../index";
import { Encoding } from "../utils";
export declare class Rule extends Lint.Rules.AbstractRule {
    static metadata: Lint.IRuleMetadata;
    static FAILURE_STRING(actual: Encoding): string;
    apply(sourceFile: ts.SourceFile): Lint.RuleFailure[];
}
