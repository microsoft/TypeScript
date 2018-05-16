import * as ts from "typescript";
import * as Lint from "../index";
export declare class Rule extends Lint.Rules.AbstractRule {
    static metadata: Lint.IRuleMetadata;
    apply(sourceFile: ts.SourceFile): Lint.RuleFailure[];
}
export declare function isNodeArray(nodeOrArray: ts.Node | ts.NodeArray<ts.Node>): nodeOrArray is ts.NodeArray<ts.Node>;
